const express = require("express");
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");
const controller = require("../controller/detail");

router.get("/:id", ensureAuthenticated, controller.detail);
router.put("/update/:id", ensureAuthenticated, controller.update);

router.get("/update/:id", ensureAuthenticated, controller.getUpdate);

module.exports = router;