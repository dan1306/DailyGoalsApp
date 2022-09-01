var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var session = require('express-session');
var passport = require('passport');
var logger = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

// load the env vars
require('dotenv').config();

var app = express();

const port = 4000

// connect to the MongoDB with mongoose
require('./config/database');
// connect to passport module
require("./config/passport");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var newRouter = require("./routes/new");
var checkInRouter = require("./routes/checkIn");
var detailRouter = require("./routes/details");

app.use(express.static("public"));

mongoose.connect(process.env.DATABASE_URL);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'Daily Goals App',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Routers
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/new", newRouter);
app.use("/checkIn", checkInRouter);
app.use("/detail", detailRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// Listening Port
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
