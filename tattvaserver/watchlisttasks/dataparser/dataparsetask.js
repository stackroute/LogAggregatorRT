var redis = require('redis');
var logger = require("../../../applogger");

function dataParserTask(subscribeFrom, publishTo, payload) {
  var subChannelClient = redis.createClient({host:appConfig.redis.host, port:appConfig.redis.port});
  var pubChannelClient = redis.createClient({host:appConfig.redis.host, port:appConfig.redis.port});

  var wlstDef = payload.watch;
  if(payload['watch'] === undefined) {
    throw new Error("Watch list definition is not passed for processing..!");
  }

  this.doTask = function() {
    subchannelClient.subscribe(subscribeFrom);

    subchannelClient.on('message', function(channel, data) {
      logger.debug("Got message from channel: ", channel, " with data: ", data);

      data = JSON.parse(data);

      var execObj = {'watchname': wlstDef.name,
      'orgsite': wlstDef.orgsite,
      'inon': new Date(),
      "data":data[2],
      "path":{},
      "errormsg": {}
      };

      pubChannelClient.publish(publishTo, JSON.stringify(execObj));
    });
  }
};

module.exports = dataParserTask;
