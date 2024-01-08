const Resource = require("../models/resources");
const User = require("../models/users");
const { cloudinary } = require("../configs/cloudinaryConfig");

module.exports.renderIndex = async (req, res) => {
  const search = req.query.searchTerm || "";
  const searchTerm = search.replace(/[#-.]|[[-^]|[?|{}]/g, "\\$&");
  const sortBy = req.query.filter?.sort || "upvotes";
  let tags = req.query.filter?.tags || [
    "Computer Science",
    "Mathematics",
    "Literature",
    "Mechanics",
    "Other",
  ];

  if (typeof tags === "string") {
    tags = [tags];
  }

  let type = req.query.filter?.type || ["video", "pdf"];

  if (typeof type === "string") {
    type = [type];
  }

  const resources = await Resource.find({
    $and: [
      { tags: { $in: tags } },
      { type: { $in: type } },
      {
        $or: [
          {
            title: new RegExp(`(\w*)${searchTerm}(\w*)`, "i"),
          },
          {
            authorName: new RegExp(`(\w*)${searchTerm}(\w*)`, "i"),
          },
        ],
      },
    ],
  })
    .populate("author")
    .sort({ [sortBy]: -1 });

  res.render("pages/home", {
    page: "home",
    resources,
    searchTerm: req.query.searchTerm,
    filter: {
      sortBy,
      tags,
      type,
    },
  });
};

module.exports.renderLibraryPage = async (req, res) => {
  const search = req.query.searchTerm || "";
  const searchTerm = search.replace(/[#-.]|[[-^]|[?|{}]/g, "\\$&");
  const sortBy = req.query.filter?.sort || "upvotes";
  let tags = req.query.filter?.tags || [
    "Computer Science",
    "Mathematics",
    "Literature",
    "Mechanics",
    "Other",
  ];

  if (typeof tags === "string") {
    tags = [tags];
  }

  let type = req.query.filter?.type || ["video", "pdf"];

  if (typeof type === "string") {
    type = [type];
  }

  const user = await User.findById(req.user.id).populate();

  const library = await Resource.find({
    _id: { $in: user.library },
    $and: [
      { tags: { $in: tags } },
      { type: { $in: type } },
      {
        $or: [
          {
            title: new RegExp(`(\w*)${searchTerm}(\w*)`, "i"),
          },
          {
            authorName: new RegExp(`(\w*)${searchTerm}(\w*)`, "i"),
          },
        ],
      },
    ],
  })
    .populate("author")
    .sort({ [sortBy]: -1 });

  res.render("pages/library", {
    page: "library",
    resources: library,
    searchTerm: req.query.searchTerm,
    filter: {
      sortBy,
      tags,
      type,
    },
  });
};

module.exports.addResourceToLibrary = async (req, res) => {
  const user = await User.findById(req.user.id);
  const resource = await Resource.findById(req.body.resourceId);

  if (user.library.includes(resource._id)) {
    req.flash("error", "Resource already in library");
    res.redirect("/library");
  } else {
    user.library.push(resource._id);
    await user.save();

    req.flash("success", "Resource added to library");
    res.redirect("/library");
  }
};

module.exports.removeResourceFromLibrary = async (req, res) => {
  const user = await User.findById(req.user.id);
  const resource = await Resource.findById(req.body.resourceId);

  user.library.pull(resource._id);
  await user.save();

  req.flash("success", "Resource removed from library");
  res.redirect("/library");
};

module.exports.renderProfilePage = async (req, res) => {
  const user = await User.findById(req.user.id);
  const resources = await Resource.find({ author: user._id });

  res.render("pages/profile", {
    page: "profile",
    user,
    resources,
  });
};

module.exports.updateProfile = async (req, res) => {
  const user = await User.findById(req.user.id);

  user.username = req.body.username;
  user.foi = req.body.foi;

  if (req.file) {
    if (user.avatar.filename !== "default.jpg") {
      await cloudinary.uploader.destroy(user.avatar.filename);
    }
    user.avatar = {
      path: req.file.path,
      filename: req.file.filename,
    };
  }

  await user.save();

  await Resource.updateMany(
    { author: user._id },
    { authorName: user.username }
  );

  req.flash("success", "Profile updated successfully");
  res.redirect("/profile");
};

module.exports.renderAboutPage = (_req, res) => {
  res.render("pages/about", {
    page: "about",
  });
};
