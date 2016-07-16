var WatchListSchema = require('../watchlists/watchlists.js');
var dataProvider = require('../core/datamodelprovider');
var buildTopology = require('./watchloopworker');
var processCoordinator = require('./processCoordinator');
var redis = require('redis');
var redisClient = redis.createClient();
var logger = require("../../applogger");

var loopRunner = function(watchlist) {
  var WatchListModel = dataProvider.getModel(WatchListSchema, watchlist.orgsite);
  return WatchListModel.findOne({name:watchlist.watchname}, function(err, watch){
    if(err) {
      logger.error("Error in finding watchlist ", watchlist.watchname, " of org ", org.orgSite, " error: ", err);
      return;
    }

    logger.info("Starting execution for watch: ", watch.orgsite, '::', watch.name);

    if(watch.expressions.length > 0) {
      var workerTopology = buildTopology(watch);
      // console.log("workerTopology:",workerTopology);
      var processToWorkerMap = processCoordinator.assignWorkersToProcesor(workerTopology,function(arg){

        var subChannel = workerTopology[0].subChannel;
        redisClient.publish(subChannel, "start");
      });
      // console.log("subChannel:",workerArray[0].subChannel);

      // for(var i=0;i<processorToWorkerMap.length;i++){
      //   for(var j=0;j<processorToWorkerMap.tasks.length;j++){
      //     if(processorToWorkerMap[i].tasks[j].type==="SourceConnector")
      //     {
      //       subChannel=processorToWorkerMap[i].tasks[j].subChannel;
      //       console.log("subChannel:",subChannel);
      //     }
      //   }
      // }

      // redisClient.subscribe(subChannel);
      // redisClient.on("subscribe", function(channel, count) {
      //   console.log("Subscribed to " + channel + ". Now subscribed to " + count + " channel(s).");
      //   pub.publish(subChannel, "start");
      // });
      //
      // redisClient.on('message', function(channel, message) {
      //   console.log("Message from channel ", channel, " : ", message);
      // });

    } else {
      logger.error("Skipping watch list execution for watchlist: ", watchlist.name, " as there are no expressions to execute..!");
    }
  });
};
module.exports = loopRunner;
