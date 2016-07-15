var redis = require('redis');

function pubDbTask(subscribeFrom, publishTo, payload) {
  // var channelClient = redis.createClient({host:appConfig.redishost, port:appConfig.redisport});
  var subChannelClient = redis.createClient({host:appConfig.redis.host, port:appConfig.redis.port});
  var pubChannelClient = redis.createClient({host:appConfig.redis.host, port:appConfig.redis.port});

  if(payload['watch'] === undefined) {
    throw new Error("Watch list definition is not passed for processing..!");
  }

  var wlstDef = payload.watch;

  this.doTask = function() {
    // console.log("Now i will do the work");
    subChannelClient.subscribe(subscribeFrom);

    subChannelClient.on('message', function(channel, data) {
      execObj = JSON.parse(data);
      // execObj saveToDBStream;
    });
  }
}//end of module function

module.exports = pubDbTask;
