var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var distWatchloopExecutor = require('./tattvaserver/distwatchloop/distwatchlooprunner.js');
var appConfig = require("./config/appconfig");

//APP logger
var logger = require("./applogger");

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.onAppStart = function(addr) {
  logger.info("Dist Watchloop Service App is now Running on port:",addr.port);
}

app.getPort = function() {
    port = undefined;

    if (process.argv.length >= 2) {
        port = process.argv[2];
        logger.debug("Port ", port, " was passed");
    }

    return port;
}

logger.info("Starting distributed Watchloop service...");
distWatchloopExecutor();

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    res.status(404).json({
        "error": "resource not found"
    });
});

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        logger.error("Internal error in watch processor: ", err);
        res.status(500).json({
            "error": err.message
        });
    });
}

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    logger.error("Internal error in watch processor: ", err);
    res.status(500).json({
        "error": err.message
    });
});

module.exports = app;
