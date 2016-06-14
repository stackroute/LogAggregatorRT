var highland = require('highland');

var exprReducerPipeline = function() {
  var myProcessors = [];

  myProcessors.push(highland.map(function(execObj) {
    var watchListResult = true;

    for (expr in execObj.path) {
      //We can do AND or OR with previous expr result
      watchListResult = ((execObj.path[expr].result) && watchListResult);
    }

    execObj.path["watchresult"] = watchListResult;
    return execObj;
  }));

  return highland.pipeline.apply(null, myProcessors);
}

module.exports = exprReducerPipeline;
