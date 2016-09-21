var redis = require('redis');
var appConfig = require('../../../config/appconfig');
var exprProcessor = require('./exprProcessor');

var logger = require('../../../applogger');

var getCompositeFnObj =  function(fnName,payload,scb,ecb){
  var compositeFunction_router = require("../../compositefunction/compositefunction_routes");
  compositeFunction_router.getFunctionByName(fnName, payload.watch.orgsite,scb,ecb);
}

var getHistoricQObj =  function(fnName,payload,scb,ecb){
  var historicQuery_router = require("../../historicQuery/historicQuery_routes");
  historicQuery_router.getQueryByName(fnName, payload.watch.orgsite,scb,ecb);
}

var getHistoricQResult =  function(queryObject,scb,ecb){
  var historicQueryProvider = require("../../datafunctionlib/datahistoricQprovider");
  var historicQueryModule = new historicQueryProvider();
  historicQueryModule.test(queryObject, scb, ecb);
}

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

  var requiredObject={};
  if(payload.expr.watch.rfield.fieldType == "compositefunction"){
    var fnName = payload.expr.watch.rfield.function;
    getCompositeFnObj(fnName,payload,function(reqObject){
      requiredObject=reqObject;
    },function(err){
      console.log(err);
    });
  }
  else if(payload.expr.watch.lfield.fieldType == "compositefunction" ){
    var fnName = payload.expr.watch.lfield.function;
    getCompositeFnObj(fnName,payload,function(reqObject){
      requiredObject=reqObject;
    },function(err){
      console.log(err);
    });
  }

  var histQResult;
  if(payload.expr.watch.rfield.fieldType == "historicData"){
    var fnName = payload.expr.watch.rfield.historicfunction;
    getHistoricQObj(fnName,payload,function(reqObject){
      getHistoricQResult(reqObject,function(queryResult){
        histQResult=queryResult;
      },function(err){
        console.log(err);
      });
    },function(err){
      console.log(err);
    });
  }
  else if(payload.expr.watch.lfield.fieldType == "historicData" ){
    var fnName = payload.expr.watch.lfield.historicfunction;
    getHistoricQObj(fnName,payload,function(reqObject){
      getHistoricQResult(reqObject,function(queryResult){
        histQResult=queryResult;
      },function(err){
        console.log(err);
      });
    },function(err){
      console.log(err);
    });
  }

  this.doTask = function() {
    subChannelClient.subscribe(subscribeFrom);

    subChannelClient.on('message', function(channel, data) {
      var execObj = JSON.parse(data);
      execObj = exprProcessor.processExpression(payload.expr, requiredObject, histQResult, execObj);

      pubChannelClient.publish(publishTo, JSON.stringify(execObj));
    });
  }

} //end of module function

module.exports = exprProcessTask;