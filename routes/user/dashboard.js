const express = require("express");
const router = express.Router();
const controller = require("../../controller/dashboard");
const { ensureAuthenticated } = require("../../config/auth");

// Dashboard
router.get("/", ensureAuthenticated, controller.dashboard);
router.get("/all", ensureAuthenticated, controller.all);
router.get("/details/:id", ensureAuthenticated, controller.details);

module.exports = router;