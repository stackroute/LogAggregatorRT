var logger = require("./applogger");
var watchloopExecutor = require('./tattvaserver/watchloop/watchlooprunner.js');

logger.info("Starting watch list executor...!");
watchloopExecutor();
