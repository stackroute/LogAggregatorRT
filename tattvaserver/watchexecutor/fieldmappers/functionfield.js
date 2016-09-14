var functionProvider = require("../../datafunctionlib/datafnprovider");
var logger = require("../../../applogger");

var functionFieldMapper = {
  map: function(fieldConfig, dataObj) {
    var result = undefined;
    var functionName = fieldConfig['function'];
    var fnParamFields = fieldConfig['functionparam'];
    fnParamFields = fnParamFields.split(","); //as function parameters are stored with comma separated value

    var fnParamData=[];
    for(i in fnParamFields) {
      var fieldData = dataObj[fnParamFields[i]];
      fnParamData.push(fieldData);
    }

    var functionModule = new functionProvider(functionName);
    var fnResult = functionModule.evaluate(fnParamData);

    if(!fnResult.error){
      result=fnResult.output;
        // logger.debug(result, " = ", functionName, "(", fnParamData, ")", "  data: ", dataObj);
    } else {
      logger.debug("Error in executing function ", functionName, " with parameters ", fnParamData);
      result = undefined;
    }

    return result;
  }
}

module.exports = functionFieldMapper;
