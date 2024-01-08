if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const { db } = require("./configs/dbConfig");
const session = require("./configs/sessionConfig");
const passport = require("./configs/passportConfig");
const flash = require("./configs/flashConfig");

const app = express();

// DB Connection
db.on("error", console.error.bind(console, "Connection Error:"));
db.once("open", () => {
  console.log("DATABASE CONNECTED!!");
});

// Body-parsers and Static files
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

// View Engine
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.engine("ejs", ejsMate);

// Configs
session(app);
passport(app);
flash(app);

// Routes
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));
app.use("/resources", require("./routes/resources"));

// Api Routes
app.use("/api", require("./api/routes/index"));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
