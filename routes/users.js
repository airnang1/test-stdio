const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");

const controller = require("../controller/auth");
// Load User model
const User = require("../models/User");
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");

// Login Page
router.get("/login", forwardAuthenticated, controller.getLogin);

// Register Page
router.get("/register", forwardAuthenticated, controller.getRegister);

// Register
router.post("/register", controller.postRegister);

// Login
router.post("/login", controller.postLogin);

// Logout
router.get("/logout", ensureAuthenticated, controller.getLogout);

module.exports = router;