const bookingModel = require("../models/booking.model");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

module.exports.confirmBooking = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    const { booking_id } = req.body;
    if (!booking_id)
      return res.status(400).json({ message: "Booking ID is required" });
    if (!mongoose.Types.ObjectId.isValid(booking_id))
      return res.status(400).json({ message: "Invalid Booking ID" });

    const booking = await bookingModel.findById(booking_id);

    if (!booking) return res.status(404).json({ message: "Booking not found" });
    if (
      booking.user.toString() == req.user._id.toString() &&
      booking.status === "confirmed"
    )
      return res.status(400).json({ message: "Booking already confirmed" });

    if (booking.status === "cancelled")
      return res.status(400).json({ message: "Booking already cancelled" });

    if (booking.user.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Unauthorized" });

    booking.status = "confirmed";
    await booking.save();
    res.status(200).json({ message: "Booking confirmed" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports.cancelBooking = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    const { booking_id } = req.body;
    if (!booking_id)
      return res.status(400).json({ message: "Booking ID is required" });
    if (!mongoose.Types.ObjectId.isValid(booking_id))
      return res.status(400).json({ message: "Invalid Booking ID" });

    const booking = await bookingModel.findById(booking_id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    if (booking.user.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Unauthorized" });
    if (booking.status === "cancelled")
      return res.status(400).json({ message: "Booking already cancelled" });
    if (booking.status === "confirmed" || booking.status === "cancelled")
      return res
        .status(400)
        .json({ message: "Cannot cancel confirmed booking" });
    booking.status = "cancelled";
    await booking.save();
    res.status(200).json({ message: "Booking cancelled" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await bookingModel.find({ user: req.user._id });
    res.status(200).json(bookings);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
