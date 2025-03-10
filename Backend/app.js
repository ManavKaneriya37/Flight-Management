const cookieParser = require('cookie-parser');

const express =  require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./Database/db');
connectDB();
const cors = require('cors');
const morgan = require('morgan');

app.use(morgan('tiny'));
app.use(cors());

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());

// routes
app.use('/users', require('./Routes/user.routes'));
app.use('/flights', require('./Routes/flights.routes'));
app.use('/bookings', require('./Routes/booking.routes'));


module.exports = app;
