var compositeFunctionProvider = require("../../datafunctionlib/datacompositefnprovider");
var logger = require("../../../applogger");

var compositeFunctionFieldMapper = {
  map: function(fieldConfig, dataObj) {
    var result = undefined;
    var compositeFunctionName = fieldConfig['functionobject'];
    var fnParamFields = fieldConfig['functionparameters'];
    
    var fnParamData={};
    
    for(i in fnParamFields){
      fnParamData[i] = dataObj[fnParamFields[i]];
    }

    var compositeFunctionModule = new compositeFunctionProvider();
    var fnResult = compositeFunctionModule.execute(compositeFunctionName,fnParamData);
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
