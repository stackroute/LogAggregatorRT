var compositeFunctionProvider = require("../../datafunctionlib/datacompositefnprovider");
var logger = require("../../../applogger");

var compositeFunctionFieldMapper = {
  map: function(fieldConfig, dataObj) {
    var result = undefined;
    var compositeFunctionName = fieldConfig['function'];
    var fnParamFields = fieldConfig['functionparam'];
    fnParamFields = fnParamFields.split(","); //as function parameters are stored with comma separated value

    var fnParamData=[];
    for(i in fnParamFields) {
      var fieldData = dataObj[fnParamFields[i]];
      fnParamData.push(fieldData);
    }

    var compositeFunctionModule = new compositeFunctionProvider(compositeFunctionName);
    var fnResult = compositeFunctionModule.evaluate(fnParamData);

    if(!fnResult.error){
      result=fnResult.output;
        // logger.debug(result, " = ", compositeFunctionName, "(", fnParamData, ")", "  data: ", dataObj);
    } else {
      logger.debug("Error in executing composite function ", compositeFunctionName, " with parameters ", fnParamData);
      result = undefined;
    }

    return result;
  }
}

module.exports = compositeFunctionFieldMapper;
