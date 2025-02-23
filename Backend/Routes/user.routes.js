const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const userController = require("../Controllers/user.controller");

router.post(
  "/register",
  body("firstName")
    .isLength({ min: 3 })
    .withMessage("First name must be at least 3 characters long"),
  body("lastName")
    .isLength({ min: 3 })
    .withMessage("Last name must be at least 3 characters long"),
  body("email").isEmail().withMessage("Please enter a valid email address"),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long"),

  userController.register
);

module.exports = router;
