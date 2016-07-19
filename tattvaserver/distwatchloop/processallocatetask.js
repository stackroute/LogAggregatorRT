var request = require("request");
var watchProcStore = require('./watchprocessstore');
var logger = require('../../applogger');

var processAllocateTask = function(watchTask) {
  return function(callback) {
    // logger.debug("Allocating watchTask ", watchTask.name, " to ", processorObj.url);
    watchProcStore.getWatchProcessorMap(function(procMap) {
      logger.debug("Selecting next available processors from ", procMap);
      processorObj = nextLeastLoadedProcessor(procMap);
      logger.debug("Next available processor is ", processorObj);

      //@TODO make HTTP request to Processor
      var options = {
        method: 'POST',
        url: 'http://' + processorObj.url + '/watchtaskprocessor/watchtask',
        json: watchTask
      };

      return request(options, function (err, res, body) {
        if (err) {
          logger.error("Error in task allocation of task: ", watchTask.name, " to processor: ", processorObj.url, " error: ", err);
          callback(null, {processor: processorObj.url, watchtask: watchTask, result: false, status: undefined, error: err, body: body});
          return false;
        } else {
          if(res === undefined || res.statusCode === undefined) {
            var myError = new Error('My custom error!');
            logger.error("Error in task allocation of task: ", watchTask.name, " to processor: ", processorObj.url, " returned with out any status ");
            callback(null, {processor: processorObj.url, watchtask: watchTask, result: false, status: undefined, error: err, body: body});
            return false;
          } else if (res.statusCode >= 200 && res.statusCode <= 299) {
            logger.info("Successfully allocated task: ", watchTask.name, " to processor: ", processorObj.url, " response ", body);
            var watchTaskObj={
              "name": watchTask.name,
              "type": watchTask.type,
              "subFrom": watchTask.subFrom,
              "pubTo": watchTask.pubTo,
              "watchName": watchTask.watchName,
              "orgsite": watchTask.orgsite
            }
            watchProcStore.registerWatchTask(processorObj.url, watchTaskObj);

            callback(null, {processor: processorObj.url, watchtask: watchTask, result: true, status: res.statusCode, error: err, body: body });
            return true;
          }
        }
      });
    });
  }//end of task
}//end of module

var nextLeastLoadedProcessor = function(processorMap) {
  var task=[];
  for(var i=0;i<Object.keys(processorMap).length;i++) {
    task.push(processorMap[Object.keys(processorMap)[i]].tasks.length);
  }

  var minLoadSize = Math.min.apply(Math,task);
  var minLoadProcIndex = task.indexOf(minLoadSize);
  var processorObj = processorMap[Object.keys(processorMap)[minLoadProcIndex]];
  // logger.debug("Choosing processor: ", processorObj);
  return processorObj;
}

// var nextRandomProcessor = function(processorMap) {
//   if(Object.keys(processorMap).length >= 2) {
//     randomIndex = getRandomInt(0, Object.keys(processorMap).length-1);
//   } else if(Object.keys(processorMap).length == 1){
//     randomIndex = 0;
//   } else {
//     throw new Error("Invalid or Insuffient processor map..!");
//   }
//
//   //Randomly pick one item
//   function getRandomInt(min, max) {
//     return Math.floor(Math.random() * (max - min)) + min;
//   }
//
//   logger.debug('Random index: ', randomIndex);
//   var processorObj = processorMap[Object.keys(processorMap)[randomIndex]];
//   logger.debug("Choosing processor: ", processorObj);
//
//   return processorObj;
// }

module.exports = processAllocateTask;
