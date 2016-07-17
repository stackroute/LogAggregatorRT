var redis = require('redis');
var logger = require('../../applogger');
var appConfig = require('../../config/appconfig');

var redisClient = redis.createClient({
  host: appConfig.redis.host,
  port: appConfig.redis.port
});

var setWatchProcessorMap = function(processorMap) {
  logger.debug('Setting processor map to redis store ', processorMap);
  redisClient.set('watchprocmap', JSON.stringify(processorMap));
}

var getWatchProcessorMap = function(cb) {
  redisClient.get('watchprocmap', function(err, reply) {
    var mapData = reply;
    logger.debug('Got processor map from redis store ', mapData);
    if (mapData !== undefined) {
      mapData = JSON.parse(mapData);
    } else {
      //if not set earlier, initialize it now
      mapData = {};
    }
    cb(mapData);
  });
}

var addWatchProcessor = function(processorObj) {
  logger.debug('Adding processor to processor map ', processorObj);
  getWatchProcessorMap(function(mapData) {
    mapData[processorObj.url] = processorObj;
    setWatchProcessorMap(mapData);
  });
}

var removeWatchProcessor = function(processorObj) {
  logger.debug('Removing processor to processor map ', processorObj);
  getWatchProcessorMap(function(mapData) {
    if (mapData[processorObj.url]) {
      delete mapData[processorObj.url];
      setWatchProcessorMap(mapData);
    }
  });
}

module.exports = {
  setWatchProcessorMap: setWatchProcessorMap,
  getWatchProcessorMap: getWatchProcessorMap,
  addWatchProcessor: addWatchProcessor,
  removeWatchProcessor: removeWatchProcessor
}