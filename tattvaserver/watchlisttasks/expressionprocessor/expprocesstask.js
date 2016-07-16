var redis = require('redis');
var appConfig = require('../../../config/appconfig');
var exprProcessor = require('./exprProcessor');

function exprProcessTask(subscribeFrom, publishTo, payload) {
    var subChannelClient = redis.createClient({
        host: appConfig.redis.host,
        port: appConfig.redis.port
    });
    var pubChannelClient = redis.createClient({
        host: appConfig.redis.host,
        port: appConfig.redis.port
    });

    var wlstDef = payload.watch;
    var expr = payload.expr;
    if (payload['watch'] === undefined) {
        throw new Error("Watch list definition is not passed for processing..!");
    }

    this.doTask = function() {
        // console.log("Now i will do the work");
        subChannelClient.subscribe(subscribeFrom);

        subChannelClient.on('message', function(channel, data) {
            var execObj = JSON.stringify(data);

            execObj = exprProcessor.processExpression(expr, execObj);

            pubChannelClient.publish(publishTo, JSON.stringify(execObj));
        });
    }
} //end of module function

module.exports = exprProcessTask;