var funcProvider = require("../../datafunctionlib/functionexecutor");

var functionfield = {
  map: function(fieldConfig, dataObj) {

    var result = undefined;
    var functionName = fieldConfig['function'];
    var fnParams = fieldConfig['functionparam'];
    fnParams = fnParams.split(","); //as function parameters are stored with comma separated value
    var data=[];

    for(i in fnParams){
      data.push(dataObj[fnParams[i]]);
    }

    var fnobj = funcProvider(functionName, data);
    if(!fnobj.error) {
      result = fnobj.output;
    }
    else {
      console.log("Error in executing function ", functionName, " with parameters ", fnParams)
      result = undefined;
    }
    // if(functionName == "Sum") {
    //   result=0;
    //   for(i in fnParams) {
    //     result += dataObj[fnParams[i]];
    //   }
    // }
    //
    // if(functionName == "Multiply") {
    //   result=1;
    //   for(i in fnParams) {
    //     result *= dataObj[fnParams[i]];
    //   }
    // }
    //
    // if(functionName == "Subtract") {
    //   result=0;
    //   for(i in fnParams) {
    //     result -= dataObj[fnParams[i]];
    //   }
    // }
    //
    // if(functionName == "Divide") {
    //   result=1;
    //   for(i in fnParams) {
    //     result /= dataObj[fnParams[i]];
    //   }
    // }

    return result;
  }
}

module.exports = functionfield;
