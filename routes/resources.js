const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const resourcesController = require("../controllers/resources");

router
  .route("/new")
  .get(isLoggedIn, resourcesController.renderNew)
  .post(isLoggedIn, resourcesController.createResource);

router
  .route("/:id")
  .get(resourcesController.renderResource)
  .delete(isLoggedIn, resourcesController.deleteResource);

router.route("/:id/upvote").get(isLoggedIn, resourcesController.upvote);
router.route("/:id/downvote").get(isLoggedIn, resourcesController.downvote);

router
  .route("/:id/comment")
  .post(isLoggedIn, resourcesController.createComment);

module.exports = router;
