const flash = require("connect-flash");
const { format, formatDistanceToNow } = require("date-fns");

module.exports = app => {
  app.use(flash());
  app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.format = format;
    res.locals.formatDistanceToNow = formatDistanceToNow;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
  });
};
