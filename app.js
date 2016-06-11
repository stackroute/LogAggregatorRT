var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var flash    = require('connect-flash');
var session      = require('express-session');
var MongoClient= require('mongodb').MongoClient;
var assert=require('assert');
var routes = require('./routes/index');
var MongoStore = require('connect-mongo')(session);
var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'bower_modules')));
app.use(express.static(path.join(__dirname, 'tattvaclient')));
app.use(session({
    secret: 'TATTVA Auth',
    cookie: {
        maxAge: 360000
    },
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
var dbURI = 'mongodb://localhost/wipro';
var fs = require("fs");
var JSONparser = bodyParser.json();
var jsonParser=bodyParser.json();
var routes = require('./routes/index');
var users = require('./routes/users');

var function_router = require('./tattvaserver/functions/functions_routes.js');
var sideNav_router = require('./tattvaserver/Home/home_routes.js');
var watchlist_router = require('./tattvaserver/watchlists/watchlist_routes.js');
var watchlistslide_router=require('./tattvaserver/dashboard/watchlistroutes');
var namespace_router = require('./tattvaserver/namespace/namespaces_routes.js');
var datasourcesrouter = require('./tattvaserver/datasources/datasources_routes.js');
var mongoose = require( 'mongoose' );
var stream_router=require('./tattvaserver/datastream/stream_routes.js');
var summary_router=require('./tattvaserver/designsummary/summary_routes.js')
var watchloop_router=require('./tattvaserver/watchloop/watchloop_routes.js')

mongoose.connect(dbURI);
mongoose.connection.on('connected', function () {  console.log('Mongoose connected to ' + dbURI); });
mongoose.connection.on('error',function (err) {  console.log('Mongoose connection error: ' + err); });
mongoose.connection.on('disconnected', function () {  console.log('Mongoose disconnected'); });
process.on('SIGINT', function() {  mongoose.connection.close(function () {    console.log('Mongoose disconnected through app termination');    process.exit(0);  }); });

// app.use('/org_admin', organisation_router);
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');

require('./tattvaserver/auth/auth')(app, passport);

app.use('/', routes);

app.get('/org_admin', function(req, res){
  res.sendFile(path.join(__dirname, 'public/json/admindata.json'));
});

app.get('/login_reg', function(req, res){
  res.sendFile(path.join(__dirname, 'public/data.json'));
});

process.on('SIGINT', function() {
mongoose.connection.close(function () {
console.log('Mongoose disconnected through app termination');
process.exit(0);
 });
 });
app.use('/', routes);
app.use('/users', users);
app.use('/instance', datasourcesrouter);
app.use('/function', function_router);
app.use('/sideNav', sideNav_router);
app.use('/namespaces',namespace_router);
app.use('/watchlist', watchlist_router);
app.use('/datastream',stream_router);
app.use('/createslide',watchlistslide_router);
app.use('/appsummary',summary_router);

app.use('/watchloop',watchloop_router);
    var err = new Error('Not Found');
app.use(function(req, res, next) {
    err.status = 404;
    next(err);
});
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err
    });
});

module.exports = app;
