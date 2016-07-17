var redis = require('redis');
var appConfig = require('../../../config/appconfig');

var logger = require('../../../applogger');

function pubDashboardTask(subscribeFrom, publishTo, payload) {
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
    // console.log("Now i will do the work");
    subChannelClient.subscribe(subscribeFrom);

    subChannelClient.on('message', function(channel, data) {
      logger.debug("Got message from channel: ", channel, " with data: ", data);

      execObj = JSON.parse(data);

      var channelName = payload.watch.orgsite + "::" + payload.watch.name;

      if (payload.watch.publishers.dashboard) {
        var watchResult = false;
        //If graph was selected
        if (payload.watch.publishers.dashboard.graphType) {
          if (execObj.path) {
            if (execObj.path.watchresult)
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
} //end of module function

module.exports = pubDashboardTask;