var WatchLoopSchema = require('../watchloop/watchloop.js');
var WatchListSchema = require('../watchlists/watchlists.js');
var dataProvider = require('../core/datamodelprovider');

var watchExecutor = require('./watchlistexecutor');

var logger = require('../../applogger');

var orgBootWatchLists = function (org) {
  //Get all the watchlist entries from the watch loop for the given organisations
  //For each watch list, kick off bootstrap asynchronously

  var WatchLoopModel = dataProvider.getModel(WatchLoopSchema, org.orgSite);
  //Get only those entries, which are submitted for running in loop, there fore status should be active
  WatchLoopModel.find({status:{ $in: ['active'] } }, { _id:0, watchname: 1 }, function(err, watchEntries) {
    if(err) {
      logger.error("Error in finding watchloop entries of watchloop of org ", org.orgSite, " error: ", err);
      return;
    }

    logger.debug("Found ", watchEntries.length, " active watches for org ", org.orgSite);

    if(watchEntries.length <= 0) {
      logger.debug("No watches to execute for org ", org.orgSite, " skipping to next org ");
      return;
    }

    var watchNameArray = [];
    watchEntries.forEach(function(watch){
      watchNameArray.push(watch.watchname);
    })

    var WatchListModel = dataProvider.getModel(WatchListSchema, org.orgSite);
    WatchListModel.find({name: {$in: watchNameArray } }, function(err, watchListColln){
      if(err) {
        logger.error("Error in finding watchlists ", watchNameArray, " of org ", org.orgSite, " error: ", err);
        return;
      }

      logger.debug("Found watch lists: ", watchListColln.length);

      watchListColln.forEach(function(wlstDef){
        setImmediate(function(){
          logger.debug("Starting watch list bootstrapping for watch list ", wlstDef.name, " org: ", wlstDef.orgsite);
          watchExecutor.executeWatchList(wlstDef);
          logger.debug("Done watch list bootstrapping for watch list ", wlstDef.name, " org: ", wlstDef.orgsite);
        })
      });
    });
  });
}

module.exports = {
  bootWatchLists: orgBootWatchLists
};
