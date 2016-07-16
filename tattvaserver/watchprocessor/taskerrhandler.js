const redis = require('redis');
const appConfig = require('../../config/appconfig')

var watchTaskErrHandler = function(err, watchtask) {
    client = redis.createClient({
        host: appConfig.redis.host,
        port: appConfig.redis.port
    });

    var taskError = {
        err: err,
        task: watchtask
    };

    client.publish('watchlist:onTaskError', JSON.stringify(taskError));
};

module.exports = {
    handleError: watchTaskErrHandler
}