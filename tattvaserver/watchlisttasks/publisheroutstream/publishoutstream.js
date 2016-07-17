var redis = require('redis');

function pubDbTask(subscribeFrom, publishTo, payload) {
  if (payload['watch'] === undefined) {
    throw new Error("Watch list definition is not passed for processing..!");
  }

  var subChannelClient = redis.createClient({
    host: appConfig.redis.host,
    port: appConfig.redis.port
  });

  this.doTask = function() {
    subChannelClient.subscribe(subscribeFrom);

    subChannelClient.on('message', function(channel, data) {
      // logger.debug("Got message from channel: ", channel, " with data: ", data);

      execObj = JSON.parse(data);
    });
  }
} //end of module function

module.exports = pubDbTask;