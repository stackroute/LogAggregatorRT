var redis = require('redis');
var highland = require('highland');
var streamToMongo = require("stream-to-mongo");
var appConfig = require('../../../config/appconfig');

var logger = require('../../../applogger');

function pubDbTask(subscribeFrom, publishTo, payload) {
  if (payload['watch'] === undefined) {
    throw new Error("Watch list definition is not passed for processing..!");
  }

  var subChannelClient = redis.createClient({
    host: appConfig.redis.host,
    port: appConfig.redis.port
  });

  var historicDB = payload.watch.orgsite + "_historic";
  var collnName = payload.watch.name;
  collnName = (collnName.replace(/\s/g, '_').toLowerCase()) + "_outcomes";

  var dbServer = 'mongodb://' + appconfig.mongo.host + ':' + appconfig.mongo.port + '/' + historicDB;
  var saveToDBStream = streamToMongo({
    db: dbServer,
    collection: collnName
  });

  this.doTask = function() {
    // console.log("Now i will do the work");
    highland(function(push, nex) {
      subChannelClient.subscribe(subscribeFrom);

      subChannelClient.on('message', function(channel, data) {
        // logger.debug("Got message from channel: ", channel, " with data: ", data);

        execObj = JSON.parse(data);

        push(null, execObj);
        next();
      });

      subChannelClient.on('error', function(err) {
        push(err);
        next();
      });

      subChannelClient.on('end', function() {
        push(err, highland.nil);
      });

    }).pipe(saveToDBStream); //Saving to DB here
  }
} //end of module function

module.exports = pubDbTask;