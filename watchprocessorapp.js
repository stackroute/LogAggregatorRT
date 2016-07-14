var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


//APP logger
var logger = require("./applogger");

//Express App created
var app = express();

app.onAppStart = function(addr) {
    logger.info("Tattva Watch Processor app is now Running on port:", addr.port);
}

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

require('./tattvaserver/auth/authbyjwttoken')(app);
var isAuthenticated = require('./tattvaserver/auth/authcheckjwt');

//Watch processor routes


app.use(function(req, res, next) {
    err.status = 404;
    res.status(404).json({
        "error": "resource not found"
    });
});

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        logger.error("Internal error in watch processor: ", err);
        console.log("Internal error in watch processor: ", err);
        res.status(500).json({
            "error": err.message
        });
    });
}

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    logger.error("Internal error in watch processor: ", err);
    console.log("Internal error in watch processor: ", err);
    res.status(500).json({
        "error": err.message
    });
});

app.getPort = function() {
    return "";
}

module.exports = app;