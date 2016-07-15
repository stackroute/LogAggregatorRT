var functionProvider = require("../../datafunctionlib/aggrprovider");
var accumulateProvider = require("../../datafunctionlib/accumulatorprovider");
var highland = require('highland');
var logger = require("../../../applogger");

var accumulatorfield = {
  accumulator: undefined,

  map: function(fieldConfig, dataObj) {
    var result = undefined;
    var acmltBy = fieldConfig.AccumulateOn;

    if('Time' == fieldConfig.AccumulateOn) {
      if(this.accumulator === undefined) {
        //Accumulator is not yet initilised with what it has to do, initlise here
        acmltBy = acmltBy.toLowerCase();
        this.accumulator = new accumulateProvider(acmltBy);
        this.accumulator.accumulateTill(fieldConfig.AccumulateTill, 'ss');
        // logger.debug("Accumulator by time is being initilised until: ", fieldConfig.AccumulateTill);
      }
      else {
        // logger.debug("Accumulator is already initilised, doing nothing..! ");
      }

      var accumulatedData = this.accumulator.collectData(dataObj);
      if(accumulatedData) {
        // logger.debug("Accumulator by time data: ", accumulatedData.length);

        var functionName = fieldConfig.FunctionenPostAccumulation;
        var fnParamFields = fieldConfig.FunctionenPostAccumulationParam;
        fnParamFields = fnParamFields.split(",");

        // logger.debug("Accumulator to Aggregate function params are  ", fnParamFields);

        highland(accumulatedData).pluck(fnParamFields).toArray(function(plukedData){
          // logger.debug("Calling function ", functionName, " with param: ", mydata);
          if(plukedData.length > 0) {
            var functionModule = new functionProvider(functionName);
            //Assigning to main result
            result = functionModule.evaluate(plukedData);
            // logger.debug("For [", fieldConfig.exprAsText, "] Post accumulation, calling aggregate function ", functionName, " with param: ", JSON.stringify(plukedData), " got result ", result);
          }

          // logger.debug("Post accumulator by time, result after aggregation : ", result);
        });
      } else {
        // logger.debug("Still accumulation is not completed");
      }
    }
    else if('Record'==fieldConfig.AccumulateOn){
      if(this.accumulator === undefined) {
        acmltBy = acmltBy.toLowerCase();
        this.accumulator = new accumulateProvider(acmltBy);
        this.accumulator.accumulateTill(fieldConfig.AccumulateTill);
      }
      else {
        // logger.debug("Accumulator is already initilised");
      }
      var accumulatedData = this.accumulator.collectData(dataObj);
      if(accumulatedData) {
        // logger.debug("Accumulated data by record : ", accumulatedData.length);
        var functionName = fieldConfig.FunctionenPostAccumulation;
        var fnParamFields = fieldConfig.FunctionenPostAccumulationParam;
        fnParamFields = fnParamFields.split(",");
        // logger.debug("Accumulator to Aggregate function params are  ", fnParamFields);
        highland(accumulatedData).pluck(fnParamFields).toArray(function(plukedData){
          // logger.debug("Calling function ", functionName, " with param: ", mydata);
          if(plukedData.length > 0) {
            var functionModule = new functionProvider(functionName);
            //Assigning to main result
            result = functionModule.evaluate(plukedData);
            // logger.debug("For [", fieldConfig.exprAsText, "] Post accumulation, calling aggregate function ", functionName, " with param: ", JSON.stringify(plukedData), " got result ", result);
          }
          // logger.debug("Post accumulator by time, result after aggregation : ", result);
        });
      } else {
        // logger.debug("Still accumulation is not completed");
      }

      return result;
    }
  }
}

module.exports = accumulatorfield;
