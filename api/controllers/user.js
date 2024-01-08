module.exports.updateProfile = async (req, res) => {
  try {
    const user = req.user;

    user.username = req.body.username;

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

    res.json({ message: "Profile updated successfully" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
