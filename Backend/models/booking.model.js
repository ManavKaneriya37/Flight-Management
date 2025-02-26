const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    flight: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Flight',
        required: true
    },
    bookingDate: {
        type: Date,
        default: Date.now
    },
    seats: {
        type: Number,
        required: true
    },
    totalCost: {
        type: Number,
        required: true
    },
    passengerDetails: [
        {
            name: String,
            age: Number,
            email: String
        }
    ],
    status: {
        type: String,
        enum: ['confirmed', 'cancelled', 'pending'],
        default: 'pending'
    }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
