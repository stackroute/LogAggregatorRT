var compositeFunctionProvider = require("../../datafunctionlib/datacompositefnprovider");
var logger = require("../../../applogger");

var compositeFunctionFieldMapper = {
  map: function(fieldConfig, functionObject, dataObj) {
    var result = undefined;
    var compositeFunctionName = fieldConfig['function'];
    var fnParamFields = fieldConfig['functionparameters'];
    
    var fnParamData={};
    
    for(i in fnParamFields){
      fnParamData[i] = dataObj[fnParamFields[i]];
    }

    var compositeFunctionModule = new compositeFunctionProvider();
    var fnResult = compositeFunctionModule.execute(functionObject, fnParamData);
    if(!fnResult.error){
      result=fnResult.output;
    } else {
      logger.debug("Error in executing composite function ", compositeFunctionName, " with parameters ", fnParamData);
      result = undefined;
    }

    return result;
  }
}

module.exports = compositeFunctionFieldMapper;
