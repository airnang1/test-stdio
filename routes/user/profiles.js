const express = require("express");

const controller = require("../../controller/profile");
const {
    ensureAuthenticated,
    forwardAuthenticated,
} = require("../../config/auth");

const router = express.Router();

router.get("/", controller.index);
router.get("/update", ensureAuthenticated, controller.getUpdate);

router.put("/update", ensureAuthenticated, controller.update);

module.exports = router;