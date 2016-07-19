var redis = require('redis');
var highland = require('highland');
var streamToMongo = require("stream-to-mongo");

function pubDbTask(subscribeFrom, publishTo, payload) {
  // var channelClient = redis.createClient({host:appConfig.redishost, port:appConfig.redisport});
  var subChannelClient = redis.createClient({host:appConfig.redis.host, port:appConfig.redis.port});

  var historicDB = wlstDef.orgsite + "_historic";
  var collnName = wlstDef.name;
  collnName = collnName.replace(/\s/g, '_').toLowerCase();
  collnName += "_outcomes";

  var dbServer = 'mongodb://localhost:27017/' + historicDB;
  var saveToDBStream = streamToMongo({db:dbServer, collection:collnName});
  if(payload['watch'] === undefined) {
    throw new Error("Watch list definition is not passed for processing..!");
  }

  var wlstDef = payload.watch;
  this.doTask = function() {
    // console.log("Now i will do the work");
    highland(function(push, nex){
      subChannelClient.subscribe(subscribeFrom);

      subChannelClient.on('message', function(channel, data) {
        execObj = JSON.parse(data);
        push(null, execObj);
        next();
      });

      subChannelClient.on('error', function(err){
        push(err);
        next();
      });

      subChannelClient.on('end', function(){
        push(err, highland.nil);
      });

    }).pipe(saveToDBStream);
  }
}//end of module function

module.exports = pubDbTask;
