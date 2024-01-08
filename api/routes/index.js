const express = require("express");
const router = express.Router();
const { checkToken } = require("../../middlewares/isLoggedIn");
const { storage } = require("../../configs/cloudinaryConfig");
const multer = require("multer");
const upload = multer({ storage });
const authRoutes = require("./auth");
const resourceRoutes = require("./resources");
const userController = require("../controllers/user");

router.use("/auth", authRoutes);
router.use("/resources", resourceRoutes);
router
  .route("/profile")
  .put(checkToken, upload.single("avatar"), userController.updateProfile);

module.exports = router;
