var redis = require('redis');
var appConfig = require('../../../config/appconfig');
var exprProcessor = require('./exprProcessor');

var logger = require('../../../applogger');

function exprProcessTask(subscribeFrom, publishTo, payload) {
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
      var execObj = JSON.parse(data);
      execObj = exprProcessor.processExpression(payload.expr, payload.watch.orgsite, execObj);
      pubChannelClient.publish(publishTo, JSON.stringify(execObj));
    });
  }
} //end of module function

module.exports = exprProcessTask;