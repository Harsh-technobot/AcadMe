const User = require("../models/users");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "You must be signed in first!");
    return res.redirect("/auth/login");
  }
  next();
};

module.exports.checkToken = (req, res, next) => {
  const token = req.headers.authorization?.split("Bearer ")[1];

  if (!token) {
    return res.status(401).json({ error: "You must be signed in first!" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "You must be signed in first!" });
    }
    User.findById(decoded._id, (err, user) => {
      if (err || !user) {
        return res.status(401).json({ error: "You must be signed in first!" });
      }
      req.user = user;
      next();
    });
  });
};
