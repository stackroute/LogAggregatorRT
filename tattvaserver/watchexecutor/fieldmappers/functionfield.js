
var functionfield = {
  map: function(fieldConfig, dataObj) {
    var result = undefined;
    var functionName = fieldConfig['function'];
    var fnParams = fieldConfig['functionparam'];
    fnParams = fnParams.split(","); //as function parameters are stored with comma separated value

    if(functionName == "Sum") {
      result=0;
      for(i in fnParams) {
        result += dataObj[fnParams[i]];
      }
    }

    if(functionName == "Multiply") {
      result=1;
      for(i in fnParams) {
        result *= dataObj[fnParams[i]];
      }
    }

    if(functionName == "Subtract") {
      result=0;
      for(i in fnParams) {
        result -= dataObj[fnParams[i]];
      }
    }

    if(functionName == "Divide") {
      result=1;
      for(i in fnParams) {
        result /= dataObj[fnParams[i]];
      }
    }

    return result;
  }
}

module.exports = functionfield;
