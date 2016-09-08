var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');

var flash = require('connect-flash');
var session = require('express-session');
var routes = require('./routes/index');

//APP logger
var logger = require("./applogger");

//Tattva components
var routes = require('./routes/index');
var users = require('./routes/users');
var function_router = require('./tattvaserver/functions/functions_routes');
var compositefunction_schema=require('./tattvaserver/compositefunction/compositefunction_schema');
var compositefunction_router = require('./tattvaserver/compositefunction/compositefunction_routes');
var constant_router = require('./tattvaserver/constants/constant_routes');
var sideNav_router = require('./tattvaserver/Home/home_routes');
var watchlist_router = require('./tattvaserver/watchlists/watchlist_routes');
var watchlistslide_router = require('./tattvaserver/watchslide/watchslideroutes');
var namespace_router = require('./tattvaserver/namespace/namespaces_routes');
var datasourcesrouter = require('./tattvaserver/datasources/datasources_routes');
// var mongoose = require('mongoose');
var stream_router = require('./tattvaserver/datastream/stream_routes');
var summary_router = require('./tattvaserver/designsummary/summary_routes')
// var watchloop_router = require('./tattvaserver/watchloop/watchloop_routes.js')
var Orguser_router = require('./tattvaserver/organisation/orgRoutes');
var admin_router = require('./tattvaserver/adminDashboard/admin_routes');
var distwatchloop_router = require('./tattvaserver/watchloop/distwatchloop_routes');
// var watchloopExecutor = require('./tattvaserver/watchloop/watchlooprunner.js')

//Express App created
var app = express();

app.onAppStart = function(addr) {
  console.log("Tattva web app is now Running on port:",addr.port);
  logger.info("Tattva web app is now Running on port:",addr.port);
}

app.use(morgan('dev'));
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
// app.use(session({
//     secret: 'TATTVA Complex Event Processor',
//     cookie: {
//         maxAge: 300000
//     },
//     resave: false,
//     saveUninitialized: false,
//     rolling: true
// }));
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(flash());

//require('./tattvaserver/auth/auth')(app, passport);
require('./tattvaserver/auth/authbyjwttoken')(app);
var isAuthenticated = require('./tattvaserver/auth/authcheckjwt');

// var dbURI = 'mongodb://localhost/wipro';
// mongoose.connect(dbURI);
// mongoose.connection.on('connected', function() {
//     logger.debug('Mongoose connected to ' + dbURI);
// });
// mongoose.connection.on('error', function(err) {
//     logger.debug('Mongoose connection error: ' + err);
// });
// mongoose.connection.on('disconnected', function() {
//     logger.debug('Mongoose disconnected');
// });
//
// process.on('SIGINT', function() {
//
//     mongoose.connection.close(function() {
//         logger.debug('Mongoose disconnected through app termination');
//         process.exit(0);
//     });
// });


app.use('/', routes);
app.get('/guest', function(req, res){
  var navItems = {
    topNav: [{'link': 'signin',
    'menu': 'Sign in'}],
    sideNav: []
  };
  res.json(navItems);
});
app.use('/users',isAuthenticated,  users);
app.use('/organisation/user',isAuthenticated,  Orguser_router);
app.use('/instance',isAuthenticated,  datasourcesrouter);
app.use('/function',isAuthenticated,  function_router);
app.use('/constant',isAuthenticated,  constant_router);
app.use('/sideNav',isAuthenticated, sideNav_router);
app.use('/namespaces',isAuthenticated, namespace_router);
app.use('/watchlist',isAuthenticated,  watchlist_router);
app.use('/datastream',isAuthenticated,  stream_router);
app.use('/watchslide',isAuthenticated, watchlistslide_router);
app.use('/appsummary',isAuthenticated, summary_router);
// app.use('/watchloop',isAuthenticated,  watchloop_router);
app.use('/adminDashboard',isAuthenticated, admin_router);
app.use('/distwatchloop', isAuthenticated,  distwatchloop_router);
app.use('/compositefunction',isAuthenticated,  compositefunction_router);

// logger.info("Starting watch list executor...!");
// watchloopExecutor();

app.use(function(req, res, next) {
  var err = new Error('Resource not found');
  err.status = 404;
  return res.status(err.status).json({
    "error": err.message
  });
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    logger.error("Internal error in watch processor: ", err);
    return res.status(err.status || 500).json({
      "error": err.message
    });
  });
}

app.use(function(err, req, res, next) {
  logger.error("Internal error in watch processor: ", err);
  return res.status(err.status || 500).json({
    "error": err.message
  });
});

module.exports = app;
