const User = require("../models/users");

module.exports.renderRegisterPage = (_req, res) => {
  res.render("auth/register", { page: "register" });
};

module.exports.renderLoginPage = (_req, res) => {
  res.render("auth/login", { page: "login" });
};

module.exports.registerUser = async (req, res, next) => {
  try {
    const { email, username, password, foi, cpassword } = req.body;

    if (password !== cpassword) {
      req.flash("error", "Passwords do not match");
      return res.redirect("/auth/register");
    }

    const user = new User({ email, username, foi });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, err => {
      if (err) return next(err);
      req.flash("success", "Welcome to AcadMe");
      res.redirect("/");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/auth/register");
  }
};

module.exports.loginUser = (req, res) => {
  const redirectUrl = req.session.returnTo || "/";
  delete req.session.returnTo;
  res.redirect(redirectUrl);
};

module.exports.logoutUser = (req, res) => {
  req.logout();
  req.flash("success", "Successfully Logged Out");
  res.redirect("/auth/login");
};

module.exports.check = (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({
      isAuthenticated: true,
      user: req.user
    })
  }
  res.json({ 
    isAuthenticated: false,
    user: null
  });
}
