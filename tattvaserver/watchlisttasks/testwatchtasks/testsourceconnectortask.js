var sourceConnectorTask = require('../sourceconnector/sourceconnecttask');
var dataParserTask = require('../dataparser/dataparsetask');
var exprProcessTask = require('../expressionprocessor/expprocesstask');
var exprReducerTask = require('../expressionreducer/expressionreducertask');
var pubDashboardTask = require('../publisherdashboard/publisherdashboard');
var pubDbTask = require('../publisherdatabase/publisherdatabase');

var watchListSchema = require('../watchlists/watchlists');
var dataProvider = require('../core/datamodelprovider');
var WatchListModel = dataProvider.getModel(WatchListSchema, 'Digital_historic');

WatchListModel.findOne({name: 'ac_log_data_outcomes'}, function(err, data) {
  if(err) {
    console.log("Error in getting watch list data: ", err);
    return;
  }

  if(!data) {
    console.log("No watch lists found");
    return;
  }

  test(data);
});

//var redis = require('redis');

function test(wlstDef) {
  var task = new srcConnectTask(wlstDef, 'watchlist:onStart:Digital:GitLogWatch', 'watchlist:onData:Digital:GitLogWatch');
  task.doTask();

  var task2 = new parseTask(wlstDef, 'watchlist:onData:Digital:GitLogWatch', 'watchlist:onParse:Digital:GitLogWatch');
  task.doTask();

  var task3 = new exprTask(wlstDef, 'watchlist:onParse:Digital:GitLogWatch', 'watchlist:onExpr:Digital:GitLogWatch');
  task.doTask();

  var task3 = new exprReduceTask(wlstDef, 'watchlist:onExpr:Digital:GitLogWatch', 'watchlist:onExpReduce:Digital:GitLogWatch');
  task.doTask();

  var task4 = new publshrDashboardTask(wlstDef, 'watchlist:onExpReduce:Digital:GitLogWatch', 'watchlist:onPublshrDashboard:Digital:GitLogWatch');
  task.doTask();

  var task5 = new publshrDatabaseTask(wlstDef, 'watchlist:onPublshrDb:Digital:GitLogWatch', 'watchlist:onPublshrDashboard:Digital:GitLogWatch');
  task.doTask();
  console.log("Got data: ",data);
}
