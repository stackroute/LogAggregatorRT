var highland = require('highland');
var fs=require('fs');

var watchPublishPipeline = function(wlstDef) {
  var myProcessors = [];

  if(wlstDef.publishers.dashboard) {
    myProcessors.push(highland.each(function(execObj) {
      var outLogFile = wlstDef.name;
      outLogFile =  outLogFile.replace(" ", "_") + ".log";
      var outtream = fs.createWriteStream(outLogFile, 'utf-8');
      outtream.write("\n" + JSON.stringify(execObj) +"\n");

      console.log("Result: ", execObj.path)
      return execObj;
    }));
  }

  if(wlstDef.publishers.database.saveas) {
    //Add a database publisher
  }

  if(wlstDef.publishers.outstream.streamname) {
    //Add a output stream publisher
  }

  return highland.pipeline.apply(null, myProcessors);
}

module.exports = watchPublishPipeline;
