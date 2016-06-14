var highland = require('highland');

//Connectors
var websocketConnector = require('./connectors/websocketconnector');

//Pipelines
var exprPipeline = require('./exprpipeline');
var exprReducerPipeline = require('./exprreducerpipeline');
var exprPublisherPipeline = require('./watchpublisherpipeline');

var watchExecutor = function(wlstDef, dataSource) {
  console.log("Request recieved for executing watch list ", wlstDef.name, " from ", dataSource.ipaddr, ":", dataSource.port);

  //Create the connector
  var sourceStream = websocketConnector(dataSource.ipaddr, dataSource.port);

  var exprPipe = exprPipeline(wlstDef);
  var exprReducePipe = exprReducerPipeline(wlstDef);
  var publisherPipe = exprPublisherPipeline(wlstDef);

  //Executing the watch list in asynch mode
  setImmediate(function(){
    highland(sourceStream)
    .pipe(exprPipe)
    .pipe(exprReducePipe)
    .pipe(publisherPipe);
  });
  console.log("Started executing watch list ", wlstDef.name);

  //@TODO handle errors from watch list execution
}//end of watchlist executor

module.exports = watchExecutor;
