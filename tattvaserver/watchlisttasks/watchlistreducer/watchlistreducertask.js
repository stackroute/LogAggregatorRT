var redis = require('redis');

function watchlistReducerTask(subscribeFrom, publishTo, payload) {
  // var channelClient = redis.createClient({host:appConfig.redishost, port:appConfig.redisport});
  var subChannelClient = redis.createClient();
  var pubChannelClient = redis.createClient();

  if(payload['watch'] === undefined) {
    throw new Error("Watch list definition is not passed for processing..!");
  }

  var wlstDef = payload.watch;
  this.doTask = function() {
    // console.log("Now i will do the work");
    subChannelClient.subscribe(subscribeFrom);

    subChannelClient.on('message', function(channel, data) {
      // dataObj = JSON.parse(data);
      console.log("Got message with data: ", data, " from channel: ", channel);

      var watchListResult = true;
      for (expr in execObj.path) {
        //We can do AND or OR with previous expr result
        watchListResult = ((execObj.path[expr].result) && watchListResult);
      }
      execObj.path["watchresult"] = watchListResult;

      pubChannelClient.publish(publishTo, JSON.stringify(execObj));

    });
  }
}//end of module function

module.exports = watchlistReducerTask;
