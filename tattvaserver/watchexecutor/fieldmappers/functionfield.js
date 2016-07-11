var funcExecutor = require("../../datafunctionlib/functionexecutor");
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

    var fnResult = funcExecutor(functionName, fnParamData);

    if(!fnResult.error){
      result=fnResult.output;
    } else {
      logger.debug("Error in executing function ", functionName, " with parameters ", fnParamData);
      result = undefined;
    }
    // logger.debug(result, " = ", functionName, "(", fnParamData, ")", "  data: ", dataObj);
    return result;
  }
}

module.exports = functionFieldMapper;
