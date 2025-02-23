const userModel = require("../models/user.model");
const { validationResult } = require("express-validator");

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
    
    res
    .status(201)
    .json({ message: "User registered successfully" });
    
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
