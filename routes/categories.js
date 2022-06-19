const express = require("express");
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");
const controller = require("../controller/category");

router.get("/", ensureAuthenticated, controller.all);
router.post("/add", ensureAuthenticated, controller.add);
router.get("/:name", ensureAuthenticated, controller.postCate);

module.exports = router;