var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var routes = require('./routes/index');
var watchloopExecutor = require('./tattvaserver/watchloop/watchlooprunner.js')
//var fs = require("fs");
//var MongoStore = require('connect-mongo')(session);

var routes = require('./routes/index');
var users = require('./routes/users');
var function_router = require('./tattvaserver/functions/functions_routes.js');
var sideNav_router = require('./tattvaserver/Home/home_routes.js');
var watchlist_router = require('./tattvaserver/watchlists/watchlist_routes.js');
var watchlistslide_router=require('./tattvaserver/watchslide/watchslideroutes.js');
var namespace_router = require('./tattvaserver/namespace/namespaces_routes.js');
var datasourcesrouter = require('./tattvaserver/datasources/datasources_routes.js');
var mongoose = require('mongoose');
var stream_router = require('./tattvaserver/datastream/stream_routes.js');
var summary_router = require('./tattvaserver/designsummary/summary_routes.js')
var watchloop_router = require('./tattvaserver/watchloop/watchloop_routes.js')
var Orguser_router=require('./tattvaserver/organisation/orgRoutes.js');

//Express App created
var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'bower_modules')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'tattvaclient')));

//Max age is 5 minutes
app.use(session({
  secret: 'TATTVA Complex Event Processor',
  cookie: {
    maxAge: 3000000
  },
  resave: false,
  saveUninitialized: false,
  rolling: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./tattvaserver/auth/auth')(app, passport);

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    req.session.touch();
    return next();
  }

  res.status(401).json({
    "error": "Unauthorized request, please signin and retry..!"
  });
};


var dbURI = 'mongodb://localhost/wipro';
mongoose.connect(dbURI);
mongoose.connection.on('connected', function() {
  console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function(err) {
  console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose disconnected');
});

process.on('SIGINT', function() {

  mongoose.connection.close(function() {
    console.log('Mongoose disconnected through app termination');
    process.exit(0);
  });
});

app.use('/', routes);
app.use('/users', isAuthenticated, users);
app.use('/organisation/user', isAuthenticated, Orguser_router);
app.use('/instance', isAuthenticated, datasourcesrouter);
app.use('/function', isAuthenticated, function_router);
app.use('/sideNav', isAuthenticated, sideNav_router);
app.use('/namespaces', isAuthenticated, namespace_router);
app.use('/watchlist', isAuthenticated, watchlist_router);
app.use('/datastream', isAuthenticated, stream_router);
app.use('/watchslide', isAuthenticated, watchlistslide_router);
app.use('/appsummary', isAuthenticated, summary_router);
app.use('/watchloop', isAuthenticated, watchloop_router);

console.log("Starting watch list executor...!");
watchloopExecutor();

app.use(function(req, res, next) {
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log("error 1 called");
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  console.log("error 1 called");
  res.render('error', {
    message: err.message,
    error: err
  });
});

module.exports = app;
