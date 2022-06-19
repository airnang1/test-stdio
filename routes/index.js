const express = require("express");
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");
const controller = require("../controller/index");

// Welcome Page
router.get("/", forwardAuthenticated, controller.index);

module.exports = router;