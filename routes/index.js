const express = require("express");
const router = express.Router();
const { storage } = require("../configs/cloudinaryConfig");
const multer = require("multer");
const upload = multer({ storage });
const isLoggedIn = require("../middlewares/isLoggedIn");
const pagesController = require("../controllers/index");

router.route("/").get(pagesController.renderIndex);

router
  .route("/profile")
  .get(isLoggedIn, pagesController.renderProfilePage)
  .put(isLoggedIn, upload.single("avatar"), pagesController.updateProfile);

router
  .route("/library")
  .get(isLoggedIn, pagesController.renderLibraryPage)
  .post(isLoggedIn, pagesController.addResourceToLibrary)
  .delete(isLoggedIn, pagesController.removeResourceFromLibrary);

router.route("/about").get(pagesController.renderAboutPage);

module.exports = router;
