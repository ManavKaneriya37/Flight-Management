const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth.middleware");
const flightController = require("../Controllers/flight.controller");

router.get(
  "/search/data",
  authMiddleware.authUser,
  flightController.getFlights
);

router.get(
  "/search/airports",
  authMiddleware.authUser,
  flightController.getAirport
);

router.post(
  "/select",
  body("flight_id").notEmpty(),
  body("airplane").notEmpty(),
  body("departure_id").notEmpty(),
  body("arrival_id").notEmpty(),
  body("outbound_date").notEmpty(),
  body("return_date").notEmpty(),
  authMiddleware.authUser,
  flightController.selectFlight
);

router.post(
  "/book",
  body("flight_id").notEmpty(),
  body("seats").notEmpty().isNumeric().toInt().isInt({ min: 1 }),
  body("passengerDetails").notEmpty().isArray(),
  body("passengerDetails.*.name").notEmpty(),
  body("passengerDetails.*.age").notEmpty(),
  body("passengerDetails.*.email").notEmpty(),
  body("airline").notEmpty(),
  body("departure_id").notEmpty(),
  body("arrival_id").notEmpty(),
  body("outbound_date").notEmpty(),
  body("return_date").notEmpty(),
  authMiddleware.authUser,
  flightController.bookFlight
);

module.exports = router;
