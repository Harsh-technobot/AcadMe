const Resource = require("../../models/resources");
const Comment = require("../../models/comments");

module.exports.getAll = async (req, res) => {
  try {
    const resources = await Resource.find({});
    res.status(200).json(resources);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getLibrary = async (req, res) => {
  try {
    const resources = await Resource.find({
      _id: { $in: req.user.library },
    });

    res.status(200).json(resources);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getUserResources = async (req, res) => {
  try {
    const resources = await Resource.find({
      author: req.user._id,
    });

    res.status(200).json({ resources });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
