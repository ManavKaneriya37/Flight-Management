const cookieParser = require('cookie-parser');

const express =  require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./Database/db');
connectDB();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());

// routes
app.use('/users', require('./Routes/user.routes'));



module.exports = app;
