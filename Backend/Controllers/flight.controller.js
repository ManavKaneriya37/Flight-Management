const { validationResult } = require("express-validator");
const { fetchFlightsData } = require("../config/serpapi");
const fs = require("fs");
const path = require("path");
const bookingModel = require("../models/booking.model");
const flightModel = require("../models/flight.model");
const userModel = require("../models/user.model");

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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }
    
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

module.exports.bookFlight = async (req, res) => {
  try {
    const {
      flight_id,
      airline,
      departure_id,
      arrival_id,
      outbound_date,
      return_date,
      seats,
      passengerDetails,
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
          flight.flight_number === flight_id && flight.airline === airline
      );
    });

    // res.send(selectedFlight);
    const flight = new flightModel({
      flightNumber: selectedFlight.flights[0].flight_number,
      airline: selectedFlight.flights[0].airline,
      departureAirport: selectedFlight.flights[0].departure_airport.name,
      arrivalAirport: selectedFlight.flights[0].arrival_airport.name,
      departureTime: selectedFlight.flights[0].departure_airport.time,
      arrivalTime: selectedFlight.flights[0].arrival_airport.time,
      price: selectedFlight.price,
      travelClass: selectedFlight.flights[0].travel_class,
      status: "Scheduled",
    });

    const savedFlight = await flight.save();

    const booking = new bookingModel({
      user: req.user._id,
      flight: savedFlight._id,
      seats: seats,
      totalCost: selectedFlight.price * seats,
      passengerDetails: passengerDetails,
      status: "pending",
    });
    const savedBooking = await booking.save();

   userModel.findByIdAndUpdate(
      req.user._id,
      { $push: { bookings: savedBooking._id } }
    ).exec();

    return res.status(200).json(savedBooking);
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
