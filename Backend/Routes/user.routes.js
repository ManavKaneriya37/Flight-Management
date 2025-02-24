const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth.middleware")

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

router.post(
    "/login",
    userController.login
);

router.get(
    "/logout",
    authMiddleware.authUser,
    userController.logout
);

router.get(
    "/",
    authMiddleware.authUser,
    userController.getProfile
);

router.get(
    "/flights",
    // authMiddleware.authUser,
    userController.getFlights
)

module.exports = router;