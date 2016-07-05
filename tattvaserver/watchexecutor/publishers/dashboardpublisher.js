var highland = require('highland');
var socketClient = require('socket.io-client');

var uiPublisherPipeline = function(wlstDef) {
  var myProcessors = [];
  var socket = new socketClient('http://localhost:8080/');

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

      socket.emit('watchlist:onResultPublish', {
        'channel': channelName,
        'logdata': execObj.data,
        'watchresult': watchResult,
        'path': execObj.path
      });
      return execObj;
    }));
  }
  return highland.pipeline.apply(null, myProcessors);
}

module.exports = uiPublisherPipeline;
