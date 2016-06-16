var highland = require('highland');
// var socket = require('socket.io-client')('http://localhost:8080/');
var socketClient = require('socket.io-client');
var fs = require('fs');

var watchPublishPipeline = function(wlstDef) {
  var myProcessors = [];
  var socket = new socketClient('http://localhost:8080/');
  var roomName = wlstDef.orgsite + "::" + wlstDef.name;
  socket.emit('join:room', {
    'room': roomName
  });

  console.log("Watch room ", roomName);

  var outLogFile = wlstDef.name;
  outLogFile = outLogFile.replace(" ", "_") + ".log";
  var outtream = fs.createWriteStream(outLogFile, 'utf-8');

  if (wlstDef.publishers.dashboard) {
    myProcessors.push(highland.map(function(execObj) {
      // console.log("Emmitting data over socket room");
      socket.emit('watchlist:onResult', {
        'room': {
          'name': roomName
        },
        'message': {
          'data': execObj
        }
      });
      return execObj;
    }));

    myProcessors.push(highland.each(function(execObj) {
      //outtream.write("\n" + JSON.stringify(execObj) + "\n");
      outtream.write(".");

      // console.log("Result: ", execObj.path)
      return execObj;
    }));
  }

  if (wlstDef.publishers.database.saveas) {
    //Add a database publisher
  }

  if (wlstDef.publishers.outstream.streamname) {
    //Add a output stream publisher
  }

  return highland.pipeline.apply(null, myProcessors);
}

module.exports = watchPublishPipeline;
