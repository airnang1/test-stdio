const express = require("express");
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");
const controller = require("../controller/product");

// Welcome Page
router.get("/", ensureAuthenticated, controller.all);
router.post("/add", ensureAuthenticated, controller.add);
router.get("/changedraft/:id", ensureAuthenticated, controller.changedraft);
router.get("/changepublic/:id", ensureAuthenticated, controller.changepublic);

router.get("/delete/:id", ensureAuthenticated, controller.delete);
router.get("/public", ensureAuthenticated, controller.public);
router.get("/draft", ensureAuthenticated, controller.draft);
module.exports = router;