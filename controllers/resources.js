const Resource = require("../models/resources");
const Comment = require("../models/comments");
const User = require("../models/users");
const parseYtLink = require("../utils/ytlinkparser");

module.exports.renderNew = (req, res) => {
  res.render("pages/add", {
    page: "add",
    tags: ["Computer Science", "Mathematics", "Literature", "Mechanics"],
  });
};

module.exports.createResource = async (req, res) => {
  const { title, description, link, tags, type, additionalTags } = req.body;
  const user = await User.findById(req.user.id);

  let tagsArray = [];

  if (tags) {
    tagsArray = [...tags, ...additionalTags?.split(",")];
  } else {
    tagsArray = ["Other"];
  }

  const newResource = new Resource({
    title,
    description,
    link,
    tags: tagsArray,
    type,
    author: req.user.id,
    authorName: user.username,
  });

  try {
    const { embed, thumbnail, video_id } = await parseYtLink(link);
    newResource.thumbnail = thumbnail;
    newResource.embed = embed;
    newResource.video_id = video_id;
    newResource.type = "video";
  } catch (e) {
    newResource.type = "pdf";
  }

  try {
    await newResource.save();
    req.flash("success", "Resource added successfully");
    res.redirect("/");
  } catch (error) {
    req.flash("error", error.message);
    res.redirect("/resources/new");
  }
};

module.exports.renderResource = async (req, res) => {
  const resource = await Resource.findById(req.params.id).populate(
    "author",
    "username"
  );

  const upvoted = req.user?.upvoted.includes(req.params.id);
  const downvoted = req.user?.downvoted.includes(req.params.id);

  const comments = await Comment.find({ resource: req.params.id }).populate(
    "author"
  );

  res.render("pages/resource", {
    page: "resource",
    resource,
    upvoted,
    downvoted,
    comments,
  });
};

module.exports.upvote = async (req, res) => {
  const user = await User.findById(req.user.id);
  const upvoted = user.upvoted.includes(req.params.id);
  const downvoted = user.downvoted.includes(req.params.id);

  try {
    const resource = await Resource.findById(req.params.id);
    if (upvoted) {
      user.upvoted = user.upvoted.filter(id => id.toString() !== req.params.id);
      resource.upvotes--;
    } else if (downvoted) {
      user.downvoted = user.downvoted.filter(
        id => id.toString() !== req.params.id
      );
      resource.downvotes--;
      user.upvoted.push(req.params.id);
      resource.upvotes++;
    } else {
      user.upvoted.push(req.params.id);
      resource.upvotes++;
    }
    await user.save();
    await resource.save();
    res.json({
      success: true,
      newUpvotes: resource.upvotes,
      newDownvotes: resource.downvotes,
    });
  } catch (error) {
    req.flash("error", "Something went wrong");
    res.redirect("/resources/" + req.params.id);
  }
};

module.exports.downvote = async (req, res) => {
  const user = await User.findById(req.user.id);
  const upvoted = user.upvoted.includes(req.params.id);
  const downvoted = user.downvoted.includes(req.params.id);

  try {
    const resource = await Resource.findById(req.params.id);
    if (downvoted) {
      user.downvoted = user.downvoted.filter(
        id => id.toString() !== req.params.id
      );
      resource.downvotes--;
    } else if (upvoted) {
      user.upvoted = user.upvoted.filter(id => id.toString() !== req.params.id);
      resource.upvotes--;
      user.downvoted.push(req.params.id);
      resource.downvotes++;
    } else {
      user.downvoted.push(req.params.id);
      resource.downvotes++;
    }
    await user.save();
    await resource.save();
    res.json({
      success: true,
      newUpvotes: resource.upvotes,
      newDownvotes: resource.downvotes,
    });
  } catch (error) {
    req.flash("error", "Something went wrong");
    res.redirect("/resources/" + req.params.id);
  }
};

module.exports.deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);

    if (resource.author.toString() !== req.user.id) {
      req.flash("error", "You are not authorized to delete this resource");
      res.redirect("/resources/" + req.params.id);
    }

    await resource.remove();
    req.flash("success", "Resource deleted successfully");
    res.redirect("/profile");
  } catch (error) {
    req.flash("error", error.message);
    res.redirect("/profile");
  }
};

module.exports.createComment = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      req.flash("error", "Resource not found");
      res.redirect("/");
    }

    await Comment.create({
      text: req.body.text,
      resource: req.params.id,
      author: req.user.id,
    });
    req.flash("success", "Comment added successfully");
    res.redirect("/resources/" + req.params.id);
  } catch (e) {
    req.flash("error", "Something Went Wrong");
    res.redirect("/resources/" + req.params.id);
  }
};
