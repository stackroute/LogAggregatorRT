var redis = require('redis');
var websocket = require('websocket-stream');
var highland = require('highland');
var StreamSchema = require('../../datastream/stream');
var DatasourceSchema = require('../../datasources/datasource');
var dataProvider = require('../../core/datamodelprovider');
var appConfig = require('../../../config/appconfig');

var logger = require('../../../applogger');

function sourceConnectorTask(subscribeFrom, publishTo, payload) {
  var subChannelClient = redis.createClient({
    host: appConfig.redis.host,
    port: appConfig.redis.port
  });
  var pubChannelClient = redis.createClient({
    host: appConfig.redis.host,
    port: appConfig.redis.port
  });

  if (payload['watch'] === undefined) {
    throw new Error("Watch list definition is not passed for processing..!");
  }

  this.doTask = function() {
    subChannelClient.subscribe(subscribeFrom);

    subChannelClient.on('message', function(channel, data) {
      logger.debug("Got message from channel: ", channel, " with data: ", data);

      dataObj = JSON.parse(data);

      getDataSourceObj(payload.watch.stream, payload.watch.orgsite)
        .then(function(dataSourceObj) {
          logger.debug("Connecting to data source: ", dataSourceObj.ipaddr, ":", dataSourceObj.port, " from ", subscribeFrom);
          // var dataSourceIp = "172.23.238.251";
          // var dataSourcePort = "7070";
          var wsstream = websocket('ws://' + dataSourceObj.ipaddr + ':' + dataSourceObj.port);
          highland(wsstream)
            .each(function(streamData) {
              // logger.debug("Stream data: ", streamData);
              var logObj = JSON.parse(streamData);
              // logger.debug("Parsed Stream data: ", logObj);
              pubChannelClient.publish(publishTo, JSON.stringify(logObj));
            });
        })
        .catch(function(err) {
          logger.error("Failed to get data source details for ", subscribeFrom, " error: ", err);
          throw new Error("Failed to get data source details..!");
        });
    });
  }
} //end of module function

var getDataSourceObj = function(streamName, orgsite) {
  return new Promise(function(resolve, reject) {
    var StreamModel = dataProvider.getModel(StreamSchema, orgsite);
    StreamModel.findOne({
      streamname: streamName
    }, function(err, streamObj) {
      if (err || (!streamObj)) {
        logger.error("Stream ", streamname, " not found or does not exist, error: ", err);
        reject({
          error: "Requested stream not found..!"
        });
      }

      // logger.debug("Stream Obj: ", streamObj);

      var DatasourceModel = dataProvider.getModel(DatasourceSchema, orgsite);
      DatasourceModel.findOne({
        name: streamObj.instance
      }, function(err, datasourceObj) {
        if (err || (!datasourceObj)) {
          logger.error("DataSource ", streamObj.instance, " not found or does not exist, error: ", err);
          reject({
            error: "Requested DataSource not found..!"
          });
        }

        // logger.debug("Datasource ", datasourceObj);

        resolve(datasourceObj);
      }); //end of data source find
    }); //end of stream find
  }); //end of promise
};

module.exports = sourceConnectorTask;