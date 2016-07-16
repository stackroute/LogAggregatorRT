var redis = require('redis');
var websocket = require('websocket-stream');
var highland = require('highland');
var appConfig = require('../../../config/appconfig');

var logger = require('../../../applogger');

function sourceConnectorTask(subscribeFrom, publishTo, payload) {
  var subChannelClient = redis.createClient({host:appConfig.redis.host, port:appConfig.redis.port});
  var pubChannelClient = redis.createClient({host:appConfig.redis.host, port:appConfig.redis.port});

  if(payload['watch'] === undefined) {
    throw new Error("Watch list definition is not passed for processing..!");
  }

  this.doTask = function() {
    // console.log("Now i will do the work");
    subChannelClient.subscribe(subscribeFrom);

    subChannelClient.on('message', function(channel, data){
      // logger.debug("Got message from channel: ", channel, " with data: ", data);

      dataObj = JSON.parse(data);

      var dataSourceIp = "172.23.238.251";
      var dataSourcePort = "7070";
      var wsstream = websocket('ws://' + dataSourceIp + ':' + dataSourcePort);
      highland(wsstream).each(function(streamData){
        // console.log(JSON.parse(streamData));
        var logObj = JSON.parse(streamData);

        pubChannelClient.publish(publishTo, JSON.stringify(logObj));
      });
    });
  }
}//end of module function

module.exports = sourceConnectorTask;
