const express = require("express");
const router = express.Router();
const resourcesController = require("../controllers/resources");
const { checkToken } = require("../../middlewares/isLoggedIn");

router.route("/").get(resourcesController.getAll);
router.route("/library").get(checkToken, resourcesController.getLibrary);
router.route("/user").get(checkToken, resourcesController.getUserResources);

module.exports = router;
