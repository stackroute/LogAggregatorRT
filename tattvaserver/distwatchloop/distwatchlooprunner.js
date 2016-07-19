var OrganisationSchema = require('../organisation/organisations.js');
var dataProvider = require('../core/datamodelprovider');
var watchProcStore = require('./watchprocessstore');
var orgwatchlooprunner = require('./orgwatchlooprunner');
var redis = require('redis');
var logger = require('../../applogger');
var appConfig = require('../../config/appconfig');

process.on('exit', function() {
  watchProcStore.clearProcessorMap();
});

var loopRunner = function() {
  watchProcStore.getWatchProcessorMap(function(procMap){
    if(Object.keys(procMap).length > 0){
      logger.info("Found ", Object.keys(procMap).length, " number of watch processors, starting wiht bootstraping of watchloop ");
      setImmediate(distWatchLoop);
    } else {
      logger.info("No watch processors available to run, waiting for watch processors...!")

      redisClient = redis.createClient({host:appConfig.redis.host, port:appConfig.redis.port});
      redisClient.subscribe('watchloop::onWatchProcessorJoin');
      redisClient.on('message', function(channel, data){
        logger.info("Triggerring distributed watch loop on processor registration...!");
        setImmediate(distWatchLoop);
        //Only once listen to this event, because on a processor becoming availabke, bootstrap only once
        redisClient.unsubscribe();
        redisClient.quit();
      });
    }
  });
}

var distWatchLoop = function() {
  var OrganisationModel = dataProvider.getModel(OrganisationSchema, appConfig.masterdb);

  OrganisationModel.find({orgName: { $ne: appConfig.masterdb }}, function(err, orgColln) {
    if(err){
      logger.error("Error in finding organisations, error: ", err);
      logger.error("Aborting watch loop");
      return;
    }

    logger.debug("Found ", orgColln.length, " organisations for running watch loop");

    orgColln.forEach(function(org) {
      setImmediate(function(){
        logger.debug("Starting watch loop bootstrapping for organisation ", org.orgSite);
        orgwatchlooprunner.bootWatchLists(org);
        logger.debug("Done bootstrapping watch loop for organisation ", org.orgSite);
      });
    });
  });
}

module.exports = loopRunner;
