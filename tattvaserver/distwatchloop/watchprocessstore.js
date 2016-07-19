var redis = require('redis');
var logger = require('../../applogger');
var appConfig = require('../../config/appconfig');

var redisClient = redis.createClient({
  host: appConfig.redis.host,
  port: appConfig.redis.port
});

var setWatchProcessorMap = function(processorMap, cb) {
  logger.debug('Setting processor map to redis store ', processorMap);
  if(cb !== undefined) {
    redisClient.set('watchprocmap', JSON.stringify(processorMap), cb);
  } else {
    redisClient.set('watchprocmap', JSON.stringify(processorMap));
  }
}

/** The callee of this method have to pass a callback mandatorily
*/
var getWatchProcessorMap = function(cb) {
  redisClient.get('watchprocmap', function(err, reply) {
    var mapData = reply;
    logger.debug('Got processor map from redis store ', mapData);
    if (mapData !== undefined && mapData !== null && mapData !== '') {
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
    setWatchProcessorMap(mapData, function() {
      client = redis.createClient();
      client.publish('watchloop::onWatchProcessorJoin', JSON.stringify(processorObj));
      client.quit();
    });
  });
}

var removeWatchProcessor = function(processorObj) {
  logger.debug('Removing processor to processor map ', processorObj);
  getWatchProcessorMap(function(mapData) {
    if (mapData[processorObj.url]) {
      delete mapData[processorObj.url];
      setWatchProcessorMap(mapData, function() {
        client = redis.createClient();
        client.publish('watchloop::onWatchProcessorLeave', JSON.stringify(processorObj));
        client.quit();
      });
    }
  });
}

var clearProcessorMap = function() {
  console.log("Deleting processor map data from redis ");
  redisClient.del('watchprocmap');
}

module.exports = {
  setWatchProcessorMap: setWatchProcessorMap,
  getWatchProcessorMap: getWatchProcessorMap,
  addWatchProcessor: addWatchProcessor,
  removeWatchProcessor: removeWatchProcessor,
  clearProcessorMap: clearProcessorMap
}
