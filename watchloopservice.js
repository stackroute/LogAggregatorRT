var express = require('express');
var logger = require("./applogger");
var watchloopExecutor = require('./tattvaserver/watchloop/watchlooprunner.js');

var app = express();

app.onAppStart = function(addr) {
  logger.info("Webservice app is now Running on port:",addr.port);
}

logger.info("Starting stand-alone watch loop service...!");
watchloopExecutor();

module.exports = app;
