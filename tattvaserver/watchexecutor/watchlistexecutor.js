var highland = require('highland');

//Connectors
var websocketConnector = require('./connectors/websocketconnector');

//Pipelines
var exprPipeline = require('./exprpipeline');
var exprReducerPipeline = require('./exprreducerpipeline');

//Publishers
var dbPublisherPipeline = require('./publishers/databasepublisher');
// var uiPublisherPipeline = require('./publishers/dashboardpublisher');
var uiPublisherPipeline = require('./publishers/dashboardredispublisher');
var drainerPipeline = require('./publishers/streamdrainer');
// var outStreamPipeline = require('./publishers/outstreampublisher');

var watchExecutor = function(wlstDef, dataSource) {
  // console.log("Request recieved for executing watch list ", wlstDef.name, " from ", dataSource.ipaddr, ":", dataSource.port);

  //Create the connector
  var sourceStream = websocketConnector(dataSource.ipaddr, dataSource.port);

  var exprPipe = exprPipeline(wlstDef);
  var exprReducePipe = exprReducerPipeline(wlstDef);

  var dbPublisherPipe = dbPublisherPipeline(wlstDef);
  var uiPublisherPipe = uiPublisherPipeline(wlstDef);
  var drainerPipe = drainerPipeline(wlstDef);
  // var outStreamPipe = outStreamPipeline(wlstDef);
  //Executing the watch list in asynch mode
  setImmediate(function(){
    highland(sourceStream)
    .pipe(exprPipe)
    .pipe(exprReducePipe)
    .pipe(uiPublisherPipe).map(function(execObj){
      //This will mark the exit from the pipeline just before saving
      execObj['outon'] = new Date();
      return execObj;
    })
    .pipe(dbPublisherPipe)
    // .pipe(drainerPipe)
  });
  console.log("Started executing watch list ", wlstDef.name);

  //@TODO handle errors from watch list execution
}//end of watchlist executor

module.exports = watchExecutor;
