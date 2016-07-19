var request = require("request");
var logger = require('../../applogger');

var processAllocateTask = function(watchTask, processorObj) {
  return function(callback) {
    // logger.debug("Allocating watchTask ", watchTask.name, " to ", processorObj.url);

    //@TODO make HTTP request to Processor
    var options = {
      method: 'POST',
      url: 'http://' + processorObj.url + '/watchtaskprocessor/watchtask',
      json: watchTask
    };

    return request(options, function (err, res, body) {
      if (err){
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
          callback(null, {processor: processorObj.url, watchtask: watchTask, result: true, status: res.statusCode, error: err, body: body });
          return true;
        }
      }
    });
  }//end of task
}//end of module

module.exports = processAllocateTask;
