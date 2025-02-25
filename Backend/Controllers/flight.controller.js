const { validationResult } = require("express-validator");
const { fetchFlightsData } = require("../config/serpapi");
const fs = require("fs");
const path = require("path");

module.exports.getFlights = async (req, res) => {
  try {
    const { departure_id, arrival_id, outbound_date, return_date } = req.query;
    const rawFlightsData = await fetchFlightsData(
      departure_id,
      arrival_id,
      outbound_date,
      return_date
    );

    const { bestFlights, otherFlights } = getAllFlights(rawFlightsData);
    // bestFlights.forEach((flight, index) => {
    //   res.json(flight.flights[index]);
    // });    

    res.status(200).json({ bestFlights, otherFlights });
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

module.exports.selectFlight = async (req, res) => {
  try {
    const {
      flight_id,
      airplane,
      departure_id,
      arrival_id,
      outbound_date,
      return_date,
    } = req.body;
    const rawFlightsData = await fetchFlightsData(
      departure_id,
      arrival_id,
      outbound_date,
      return_date
    );
    const { bestFlights, otherFlights } = getAllFlights(rawFlightsData);

    const allFlights = [...bestFlights, ...otherFlights];

    const selectedFlight = allFlights.find((flight) => {
      return flight.flights.some(
        (flight) =>
          flight.flight_number === flight_id && flight.airplane === airplane
      );
    });

    if (selectedFlight) {
      res.status(200).json(selectedFlight);
    } else {
      res.status(404).json({ message: "Flight not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const getAllFlights = (raw) => {
  let bestFlights = raw.best_flights.map((flight) => flight);
  let otherFlights = raw.other_flights.map((flight) => flight);
  return { bestFlights, otherFlights };
};

const fetchAirportsData = async (name) => {
  try {
    const dataPath = path.join(__dirname, "../resources/API/IATACities.json");
    const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
    const airports = data.airports.filter(
      (airport) =>
        airport.iata.toLowerCase().includes(name.toLowerCase()) ||
        airport.name.toLowerCase().includes(name.toLowerCase()) ||
        airport.airport.toLowerCase().includes(name.toLowerCase()) ||
        airport.iata.toLowerCase().startsWith(name.toLowerCase()) ||
        airport.name.toLowerCase().startsWith(name.toLowerCase()) ||
        airport.airport.toLowerCase().startsWith(name.toLowerCase())
    );
    return airports;
  } catch (error) {
    throw new Error(error.message);
  }
};
