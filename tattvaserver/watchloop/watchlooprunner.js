var WatchLoopSchema = require ('./watchloop');
var WatchListSchema = require ('../watchlists/watchlists');
var watchExecutor = require ('../watchexecutor/watchlistexecutor');
var OrganisationSchema = require('../organisation/organisations.js');
var dataProvider = require('../core/datamodelprovider');

var logger = require("../../applogger");

var loopRunner = function() {
  //for each watch list added in watchloop
  //get the watchlist definition from db
  //kick watchExecutor(wlstDef);

  var dataSource = {
    ipaddr: '172.23.238.253',
    port: '7070'
  };

  var OrganisationModel = dataProvider.getModel(OrganisationSchema,"tattva");

  OrganisationModel.find({}, function(err, orgColln) {
    if(err){
      logger.error("error in finding organisations, error: ", err);
      return;
    }

    logger.debug("Found ", orgColln.length, " organisations in watch loop");

    orgColln.forEach(function(org) {
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

        watchEntries.forEach(function(watch) {
          var WatchListModel = dataProvider.getModel(WatchListSchema, watch.orgsite);
          WatchListModel.findOne({name:watch.watchname}, function(err, wlstDef){
            if(err) {
              logger.error("Error in finding watchlist ", watch.watchname, " of org ", org.orgSite, " error: ", err);
              return;
            }

            logger.info("Starting execution for watch: ", wlstDef.orgsite, '::', wlstDef.name);
            watchExecutor(wlstDef, dataSource);
          });
        });
      });
    });
  });
}

module.exports = loopRunner;
