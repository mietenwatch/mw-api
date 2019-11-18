var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const helmet = require('helmet')
var affordabilityRouter = require('./routes/affordability');
var affordabilityAVGRouter = require('./routes/affordabilityAVG');
var affordabilityH4Router = require('./routes/affordabilityH4');
var affordabilityWRLRouter = require('./routes/affordabilityWRL');
var affordabilityWoRLRouter = require('./routes/affordabilityWoRL');
var estatesRouter = require('./routes/estates');
var compression = require('compression');


var app = express();


app.use(helmet())
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/affordability', affordabilityRouter);
app.use('/affordabilityAVG', affordabilityAVGRouter);
app.use('/affordabilityH4', affordabilityH4Router);
app.use('/affordabilityWRL', affordabilityWRLRouter);
app.use('/affordabilityWoRL', affordabilityWoRLRouter);
app.use('/estates', estatesRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  console.error(err.message); // Log error message in our server's console
  if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
  res.status(err.statusCode).send(err.message); // All HTTP requests must have a response, so let's send back an error with its status code and message
});
app.use(compression());

module.exports = app;
