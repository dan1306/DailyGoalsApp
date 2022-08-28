var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require("body-parser");
const mongoose = require("mongoose")


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var newRouter = require('./routes/new');
var checkInRouter = require('./routes/checkIn');
var detailRouter = require('./routes/details');


var app = express();

mongoose.connect("mongodb://127.0.0.1/dailyGoals")

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
  extended: true
}));
// app.use(express.static("public"));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/new', newRouter);
app.use('/checkIn', checkInRouter);
app.use('/detail', detailRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(4000, () => {
  console.log(`Example app listening at http://localhost:${4000}`)
})


module.exports = app;
