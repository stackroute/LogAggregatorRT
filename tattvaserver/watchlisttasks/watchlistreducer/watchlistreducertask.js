var redis = require('redis');
var appConfig = require('../../../config/appconfig');
var logger = require("../../../applogger");

function watchlistReducerTask(subscribeFrom, publishTo, payload) {
  if (payload['watch'] === undefined) {
    throw new Error("Watch list definition is not passed for processing..!");
  }

  var subChannelClient = redis.createClient({
    host: appConfig.redis.host,
    port: appConfig.redis.port
  });
  var pubChannelClient = redis.createClient({
    host: appConfig.redis.host,
    port: appConfig.redis.port
  });

  this.doTask = function() {
    subChannelClient.subscribe(subscribeFrom);

    subChannelClient.on('message', function(channel, data) {
      // logger.debug("Got message from channel: ", channel, " with data: ", data);

      var execObj = JSON.parse(data);

      var watchListResult = true;
      for (expr in execObj.path) {
        //We can do AND or OR with previous expr result
        watchListResult = ((execObj.path[expr].result) && watchListResult);
      }

      execObj.path["watchresult"] = watchListResult;

      pubChannelClient.publish(publishTo, JSON.stringify(execObj));

    });
  }
} //end of module function

module.exports = watchlistReducerTask;