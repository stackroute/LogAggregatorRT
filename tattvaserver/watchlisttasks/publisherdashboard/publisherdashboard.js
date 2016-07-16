var redis = require('redis');

function pubDashboardTask(subscribeFrom, publishTo, payload) {
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

      var channelName = wlstDef.orgsite + "::" + wlstDef.name;

      if (wlstDef.publishers.dashboard) {
        var watchResult = false;
        //If graph was selected
        if(wlstDef.publishers.dashboard.graphType) {
          if(execObj.path) {
            if(execObj.path.watchresult)
            watchResult = execObj.path.watchresult;
          }
        }

        var chData = {
          'channel': channelName,
          'logdata': execObj.data,
          'watchresult': watchResult,
          'path': execObj.path
        };

        var chDataStr = JSON.stringify(chData);
        dashboardSocketChannel = 'watchlist:onResultPublish';
        pubChannelClient.publish(dashboardSocketChannel, chDataStr);
      }
    });
  }
}//end of module function

module.exports = pubDashboardTask;
