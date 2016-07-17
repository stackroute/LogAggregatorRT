var redis = require('redis');
var logger = require("../../../applogger");
var appConfig = require('../../../config/appconfig');

function dataParserTask(subscribeFrom, publishTo, payload) {
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

      data = JSON.parse(data);
      data = data[2]; //this is due to the way we are using git log, once format of it is fixed, we should remove this

      var execObj = {
        'watchname': payload.watch.name,
        'orgsite': payload.watch.orgsite,
        'inon': new Date(),
        "data": data,
        "path": {},
        "errormsg": {}
      };

      pubChannelClient.publish(publishTo, JSON.stringify(execObj));
    });
  }
};

module.exports = dataParserTask;