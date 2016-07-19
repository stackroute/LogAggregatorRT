var WatchLoopSchema = require('../watchloop/watchloop.js');
var dataProvider = require('../core/datamodelprovider');
var watchlistExecutor=require('./watchlistexecutor');

var logger = require("../../applogger");

var loopRunner = function(org) {
  var WatchLoopModel = dataProvider.getModel(WatchLoopSchema, org.orgSite);
  WatchLoopModel.find({}, function(err, watchEntries) {
    if(err) {
      logger.error("Error in finding watch LOOP entries of watchloop of org ", org.orgSite, " error: ", err);
      return;
    }

    logger.info("Found ", watchEntries.length, " watches for org ", org.orgSite);
    if(watchEntries.length <= 0) {
      logger.debug("No watches to execute for org ", org.orgSite, " skipping to next org ");
      return;
    }

    watchEntries.forEach(function(watch){
      setImmediate(function(){
        watchlistExecutor(watch)
      })
    });

  });
};
module.exports = loopRunner;
