const userModel = require("../models/user.model");
const { validationResult } = require("express-validator");
const { fetchFlightsData } = require("../config/serpapi");

module.exports.register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, password } = req.body;
    const user = await userModel.findOne({
      email,
    });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await userModel.hashPassword(password);
    const newUser = new userModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = await newUser.generateAuthToken();
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: true,
    });




    res.status(201).json({token, user: {firstName, lastName, email},  message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    const user = await userModel.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = await user.generateAuthToken();
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: true,
    });

    res.status(200).json({ token, user: user.email, message: "User logged in successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "User logged out successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.getProfile = async (req, res) => {
  try {
    const user = await userModel
      .findById(req.user._id)
      .select("-password")
      .populate({
        path: "bookings",
        populate: {
          path: "flight",
        },
      })
      .exec();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.getFlights = async (req, res) => {
  try {
    const { departure_id, arrival_id, outbound_date, return_date } = req.query;
    const rawFlightsData = await fetchFlightsData(
      departure_id,
      arrival_id,
      outbound_date,
      return_date
    );

    let bestFlights = rawFlightsData.best_flights.map((flight) => flight);
    let otherFlights = rawFlightsData.other_flights.map((flight) => flight);
    // bestFlights.forEach(flight => {
    //   res.json(flight.flights[0]);
    // });
    res.status(200).json({ bestFlights, otherFlights });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    if (!firstName ||!lastName ||!email) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }
    const user = await userModel.findByIdAndUpdate(req.user._id, {
      firstName,
      lastName,
      email,
    });
    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
