const User = require("../../models/users");
const jwt = require("jsonwebtoken");

module.exports.signUp = async (req, res) => {
  try {
    const { email, password, username, foi } = req.body;
    const user = new User({ email, username, foi });
    const registeredUser = await User.register(user, password);
    const token = jwt.sign({ _id: registeredUser._id }, process.env.JWT_SECRET);

    res.json({
      token,
      user: {
        id: registeredUser._id,
        username: registeredUser.username,
        avatar: registeredUser.avatar.path,
      },
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

module.exports.logIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    const isMatch = await user.authenticate(password);

    if (isMatch.error) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        avatar: user.avatar.path,
      },
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
