var redis = require('redis');
var appConfig = require('../../../config/appconfig');
var exprProcessor = require('./exprProcessor');

var logger = require('../../../applogger');

function exprProcessTask(subscribeFrom, publishTo, payload) {
  var subChannelClient = redis.createClient({
    host: appConfig.redis.host,
    port: appConfig.redis.port
  });
  var pubChannelClient = redis.createClient({
    host: appConfig.redis.host,
    port: appConfig.redis.port
  });

  if (payload['watch'] === undefined) {
    throw new Error("Watch list definition is not passed for processing..!");
  }

  this.doTask = function() {
    // console.log("Now i will do the work");
    subChannelClient.subscribe(subscribeFrom);

    subChannelClient.on('message', function(channel, data) {
      // logger.debug("Got message from channel: ", channel, " with data: ", data);

      var execObj = JSON.parse(data);
      // logger.debug("Exec obj: ", execObj);

      execObj = exprProcessor.processExpression(payload.expr, execObj);

      // logger.debug("Processed expression result: ", execObj);

      pubChannelClient.publish(publishTo, JSON.stringify(execObj));
    });
  }
} //end of module function

module.exports = exprProcessTask;
