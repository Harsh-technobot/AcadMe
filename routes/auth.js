const express = require("express");
const passport = require("passport");
const router = express.Router();
const authController = require("../controllers/auth");

router
  .route("/register")
  .get(authController.renderRegisterPage)
  .post(authController.registerUser);

router
  .route("/login")
  .get(authController.renderLoginPage)
  .post(
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/auth/login",
      successFlash: "Welcome Back!",
    }),
    authController.loginUser
  );

router.get("/logout", authController.logoutUser);

module.exports = router;
