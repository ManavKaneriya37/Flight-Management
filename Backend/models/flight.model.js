const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
    flightNumber: {
        type: String,
        required: true,
        unique: true
    },
    airline: {
        type: String,
        required: true
    },
    departureAirport: {
        type: String,
        required: true
    },
    arrivalAirport: {
        type: String,
        required: true
    },
    departureTime: {
        type: Date,
        required: true
    },
    arrivalTime: {
        type: Date,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Scheduled', 'Delayed', 'Cancelled'],
        default: 'Scheduled'
    }
});

const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;
