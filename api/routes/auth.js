const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");

router.route("/signup").post(authController.signUp);
router.route("/login").post(authController.logIn);

module.exports = router;
