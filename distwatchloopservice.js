var express = require('express');
var logger = require("./applogger");
var getWatclistColln = require('./tattvaserver/distwatchloop/distwatchloop_routes.js');

var app = express();

app.onAppStart = function(addr) {
  console.log("Dist Watchloop Service Appp is now Running on port:",addr.port);
  logger.info("Dist Watchloop Service App is now Running on port:",addr.port);
}


logger.info("Starting distributed Watchloop service...");
getWatclistColln();

module.exports = app;
