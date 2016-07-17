var asyncModel = require('async');
var taskTopologyBuilder = require('./watchTaskTopologyBuilder');
var processAllocator = require('./watchprocessallocator');
var ProcessAllocateTask = require('./processallocatetask');
var redis = require('redis');
var logger = require('../../applogger');

var disExecuteWatchList = function(wlstDef) {
  if (wlstDef.expressions.length > 0) {
    var watchTopology = taskTopologyBuilder.buildTaskTopology(wlstDef);
    // logger.debug("watch topology of orgsite: ",wlstDef.orgsite," is:",watchTopology);

    processAllocatorTaskArray = [];
    watchTopology.forEach(function(watchTask) {
      processorObj = processAllocator.getNextAvailableProcessor();
      var task = new ProcessAllocateTask(watchTask, processorObj);
      processAllocatorTaskArray.push(task);
    });

    asyncModel.parallel(processAllocatorTaskArray, function(err, taskResult) {
      // logger.debug("Task To Processor Allocate result: ", taskResult);
      //Save to DB
      // saveTopologyToProcessorMap();

      //Start the execution
      var redisClient = redis.createClient();
      redisClient.publish(watchTopology[0].subFrom, JSON.stringify({
        start: true
      }));
    });
  } else {
    logger.error("Skipping watch list execution for watchlist: ", wlstDef.name, " as there are no expressions to execute..!");
  }
}

module.exports = {
  executeWatchList: disExecuteWatchList
}