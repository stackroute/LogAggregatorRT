var highland = require('highland');
var fs = require('fs');

var drainerPipeline = function(wlstDef) {
  var myProcessors = [];

  var outLogFile = wlstDef.name;
  outLogFile = outLogFile.replace(" ", "_").toLowerCase() + ".log";
  var outtream = fs.createWriteStream(outLogFile, 'utf-8');

  myProcessors.push(highland.each(function(execObj) {
    // outtream.write("\n" + JSON.stringify(execObj) + "\n");
    outtream.write(".");

    return execObj;
  }));

  return highland.pipeline.apply(null, myProcessors);
}

module.exports = drainerPipeline;
