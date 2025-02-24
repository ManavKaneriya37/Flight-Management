const { validationResult } = require("express-validator");
const { fetchFlightsData } = require("../config/serpapi");
const fs = require('fs');
const path = require('path');

module.exports.getFlights = async (req, res) => {
    try {
      const { departure_id, arrival_id, outbound_date, return_date } = req.query;
      const rawFlightsData = await fetchFlightsData(
        departure_id,
        arrival_id,
        outbound_date,
        return_date
      );
  
      let bestFlights = rawFlightsData.best_flights.map(flight => flight );
      let otherFlights = rawFlightsData.other_flights.map(flight => flight );
      // bestFlights.forEach(flight => {
      //   res.json(flight.flights[0]);
      // });
      res.status(200).json({bestFlights,otherFlights});
  
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

module.exports.getAirport = async (req, res) => {
    try {
      const name = req.query.name;
      const airports = await fetchAirportsData(name);
      res.status(200).json(airports);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

const fetchAirportsData = async (name) => {
  try {
    const dataPath = path.join(__dirname, '../resources/API/IATACities.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    const airports = data.airports.filter(airport => 
      airport.iata.toLowerCase().includes(name.toLowerCase()) ||
      airport.name.toLowerCase().includes(name.toLowerCase()) ||
      airport.airport.toLowerCase().includes(name.toLowerCase())
    );
    return airports;
  } catch (error) {
    throw new Error(error.message);
  }
}