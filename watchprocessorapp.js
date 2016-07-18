var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var request = require('request');

var appConfig = require("./config/appconfig");

//APP logger
var logger = require("./applogger");

var processRoutes = require('./tattvaserver/watchprocessor/processRoutes');

//Express App created
var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

var myPort = "";

app.onAppStart = function(addr) {
  myPort = addr.port;

  logger.info("Tattva Watch Processor app is now Running on port:", myPort);

  var options = {
    method: 'POST',
    url: 'http://' + appConfig.watchloop.url + '/watchloopservice/watchprocessor',
    json: {
      url: ('localhost' + ':' + myPort),
      host: 'localhost',
      port: myPort
    }
  };

  return request(options, function(err, res, body) {
    if (err) {
      logger.error("Error in self registering with watchloop, error: ", err);
      process.exit(1);
    } else {
      if (res === undefined || res.statusCode === undefined) {
        logger.error("Error in self registering with watchloop, returned with out any status");
        process.exit(1);
      } else if (res.statusCode >= 200 && res.statusCode <= 299) {
        logger.info("Successfully registered with watchloop");
      }
    }
  });
}

process.on('SIGINT', function() {
  logger.info("Going to terminate all active connections...!");

  var options = {
    method: 'DELETE',
    url: 'http://' + appConfig.watchloop.url + '/watchloopservice/watchprocessor',
    json: {
      url: ('localhost' + ':' + myPort),
      host: 'localhost',
      port: myPort
    }
  };

  return request(options, function(err, res, body) {
    if (err) {
      logger.error("Error in deregistering with watchloop, error: ", err);
      process.exit(1);
    } else {
      if (res === undefined || res.statusCode === undefined) {
        logger.error("Error in deregistering with watchloop, returned with out any status");
        process.exit(1);
      } else if (res.statusCode >= 200 && res.statusCode <= 299) {
        logger.info("Successfully deregistering with watchloop");
        process.exit(0);
      }
    }
  });

});

app.getPort = function() {
  port = undefined;

  if (process.argv.length >= 2) {
    port = process.argv[2];
    logger.debug("Port ", port, " was passed");
  }


  return port;
}

// require('./tattvaserver/auth/authbyjwttoken')(app);
// var isAuthenticated = require('./tattvaserver/auth/authcheckjwt');

//Watch processor routes
app.use('/watchtaskprocessor/', processRoutes);

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