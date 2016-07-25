var highland = require('highland');
var redis = require('redis');

var uiPublisherPipeline = function(wlstDef) {
  var myProcessors = [];
  var redisClient = new redis.createClient();

  var channelName = wlstDef.orgsite + "::" + wlstDef.name;

  if (wlstDef.publishers.dashboard) {
    myProcessors.push(highland.map(function(execObj) {
      // console.log("Emmitting data over socket room");

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
      redisClient.publish('watchlist:onResultPublish', chDataStr);
      return execObj;
    }));
  }
  return highland.pipeline.apply(null, myProcessors);
}

module.exports = uiPublisherPipeline;
