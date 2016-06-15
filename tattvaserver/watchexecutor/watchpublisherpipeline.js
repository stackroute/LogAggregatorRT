var highland = require('highland');
// var socket = require('socket.io-client')('http://localhost:8080/');
var fs = require('fs');

var watchPublishPipeline = function(wlstDef) {
    var myProcessors = [];

    if (wlstDef.publishers.dashboard) {
        myProcessors.push(highland.map(function(execObj) {
            console.log("Sending data over sockets ");

            var socket = require('socket.io-client')('http://localhost:8080/');

            //'room': (wlstDef.orgsite + "::" + wlstDef.name);
            socket.emit('join:room', {
                'room': 'myroom'
            });

            console.log("Emmitting data over socket room");
            socket.emit('watchlist:onResult', {
                'room': {
                    'name': 'myroom'
                },
                'message': {
                    'data': execObj
                }
            });

            return execObj;
        }));

        myProcessors.push(highland.each(function(execObj) {
            var outLogFile = wlstDef.name;
            outLogFile = outLogFile.replace(" ", "_") + ".log";
            var outtream = fs.createWriteStream(outLogFile, 'utf-8');
            outtream.write("\n" + JSON.stringify(execObj) + "\n");

            console.log("Result: ", execObj.path)
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