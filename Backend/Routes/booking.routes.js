const express = require('express');
const router = express.Router();
const bookingController = require('../Controllers/booking.controller');
const authController = require('../middlewares/auth.middleware');
const { body } = require('express-validator');

router.post(
    "/confirm",
    body("booking_id").notEmpty(),
    authController.authUser,
    bookingController.confirmBooking
)

router.post(
    "/cancel",
    body("booking_id").notEmpty(),
    authController.authUser,
    bookingController.cancelBooking
)

router.get(
    "/all",
    authController.authUser,
    bookingController.getUserBookings
)

module.exports = router;