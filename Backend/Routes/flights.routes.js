const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth.middleware")

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
    authMiddleware.authUser,
    flightController.selectFlight
)

module.exports = router;