var asyncModel = require('async');
var taskTopologyBuilder = require('./watchTaskTopologyBuilder');
var processAllocator = require('./watchprocessallocator');
var ProcessAllocateTask = require('./processallocatetask');
var redis = require('redis');
var appConfig = require('../../config/appconfig');
var logger = require('../../applogger');

var distExecuteWatchList = function(wlstDef) {
  if (wlstDef.expressions.length > 0) {
    var watchTopology = taskTopologyBuilder.buildTaskTopology(wlstDef);
    // logger.debug("watch topology of orgsite: ",wlstDef.orgsite," is:",watchTopology);

    processAllocatorTaskArray = [];
    watchTopology.forEach(function(watchTask) {
      // processorObj = processAllocator.getNextAvailableProcessor();
      // var task = new ProcessAllocateTask(watchTask, processorObj);
      var task = new ProcessAllocateTask(watchTask);
      processAllocatorTaskArray.push(task);
    });

    asyncModel.parallel(processAllocatorTaskArray, function(err, taskResult) {
      // logger.debug("Task To Processor Allocate result: ", taskResult);
      //Save to DB
      // saveTopologyToProcessorMap();

      //Start the execution
      var redisClient = redis.createClient({
        host: appConfig.redis.host,
        port: appConfig.redis.port
      });

      setTimeout(function(){
        logger.debug('Kicking execution of ', watchTopology[0].subFrom);
        redisClient.publish(watchTopology[0].subFrom, JSON.stringify({
          start: true
        }));

        //Publish event about watch lists starting on processors
        var chnl = 'watchloop::onWatchListJoin';
        redisClient.publish(chnl, JSON.stringify({name:wlstDef.name, orgsite: wlstDef.orgsite}));
        logger.debug("Published ", chnl);
      }, 5000);

    });
  } else {
    logger.error("Skipping watch list execution for watchlist: ", wlstDef.name, " as there are no expressions to execute..!");
  }
}

module.exports = {
  executeWatchList: distExecuteWatchList
}
