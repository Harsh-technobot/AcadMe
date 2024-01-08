const MongoDbStore = require("connect-mongo");
const session = require("express-session");
const secret = process.env.SECRET || "thisisasecret";
const { db_url } = require("./dbConfig");

const sessionConfig = {
  name: "asdbhbcaskjdfuygshvbdashbysgx",
  secret: secret,
  secure: process.env.NODE_ENV === "production",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 3,
    maxAge: Date.now() + 1000 * 60 * 60 * 24 * 3,
  },
  store: MongoDbStore.create({
    mongoUrl: db_url,
    touchAfter: 24 * 3600,
  }),
};

module.exports = app => {
  app.use(session(sessionConfig));
};
