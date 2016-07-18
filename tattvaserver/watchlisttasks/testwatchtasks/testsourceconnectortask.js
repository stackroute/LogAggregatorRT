var logger = require('../../../applogger');
var redis = require('redis');
var sourceConnectorTask = require('../sourceconnector/sourceconnecttask');
var dataParserTask = require('../dataparser/dataparsetask');
var exprProcessTask = require('../expressionprocessor/expprocesstask');
var wtlstResultTask = require('../watchlistreducer/watchlistreducertask');
var pubDashboardTask = require('../publisherdashboard/publisherdashboard');
var pubDbTask = require('../publisherdatabase/publisherdatabase');

var WatchListSchema = require('../../watchlists/watchlists');
var dataProvider = require('../../core/datamodelprovider');

var WatchListModel = dataProvider.getModel(WatchListSchema, 'niit');

WatchListModel.findOne({
  name: "Git Anomoly Analysis"
}, function(err, data) {
  if (err) {
    console.log("Error in getting watch list data: ", err);
    return;
  }

  if (!data) {
    console.log("No watch lists found");
    return;
  }

  // console.log("Watchlist: ", data);

  test(data);
});


function test(wlstDef) {
  testSrcConnectorTask(wlstDef);
  // testDataParserTask(wlstDef);
  // testExpProcessorTask(wlstDef);
  // testWlstResultTask(wlstDef);
  // testPubDashboard(wlstDef);
  // testPubDB(wlstDef);

  startWatchExec(wlstDef);
}

function startWatchExec(wlstDef) {
  var client = redis.createClient();

  var subFrom = getChannelName('onStart', wlstDef.orgsite, wlstDef.name);
  client.publish(subFrom, JSON.stringify({
    start: true
  }));
}


function testSrcConnectorTask(wlstDef) {
  var subFrom = getChannelName('onStart', wlstDef.orgsite, wlstDef.name);
  var pubTo = getChannelName('onData', wlstDef.orgsite, wlstDef.name);
  var payload = {
    'watch': wlstDef
  };
  var task = new sourceConnectorTask(subFrom, pubTo, payload);

  task.doTask();
}

function testDataParserTask(wlstDef) {
  var subFrom = getChannelName('onData', wlstDef.orgsite, wlstDef.name);
  var pubTo = getChannelName('onParse', wlstDef.orgsite, wlstDef.name);
  var payload = {
    'watch': wlstDef
  };
  var task = new dataParserTask(subFrom, pubTo, payload);

  task.doTask();
}

function testExpProcessorTask(wlstDef) {
  var subFrom = getChannelName('onParse', wlstDef.orgsite, wlstDef.name);
  var pubTo = getChannelName('onExp', wlstDef.orgsite, wlstDef.name);

  var payload = {
    'watch': wlstDef,
    'expr': wlstDef.expressions[0]
  };
  var task = new exprProcessTask(subFrom, pubTo, payload);

  task.doTask();
}

function testWlstResultTask(wlstDef) {
  var subFrom = getChannelName('onExp', wlstDef.orgsite, wlstDef.name);
  var pubTo = getChannelName('onResult', wlstDef.orgsite, wlstDef.name);
  var payload = {
    'watch': wlstDef
  };
  var task = new wtlstResultTask(subFrom, pubTo, payload);

  task.doTask();
}

function testPubDashboard(wlstDef) {
  var subFrom = getChannelName('onResult', wlstDef.orgsite, wlstDef.name);
  var pubTo = "";
  var payload = {
    'watch': wlstDef
  };
  var task = new pubDashboardTask(subFrom, pubTo, payload);

  task.doTask();
}

function testPubDB(wlstDef) {
  var subFrom = getChannelName('onResult', wlstDef.orgsite, wlstDef.name);
  var pubTo = "";
  var payload = {
    'watch': wlstDef
  };
  var task = new pubDbTask(subFrom, payload);

  task.doTask();
}

// function testOutStream(wlstDef) {
//   var subFrom = getChannelName('onResult', wlstDef.orgsite, wlstDef.name);
//   //var pubTo = getChannelName('onResult', wlstDef.orgsite, wlstDef.name);
//   var payload = { 'watch' : wlstDef };
//   var task = new pubDbTask(subFrom, payload);
//   console.log("Data for Database");
//   task.doTask();
// }

function getChannelName(eventName, orgSite, watchName) {
  var channel = 'watchlist:' + eventName + ':' + orgSite + ':' + watchName;
  channel = channel.toLowerCase();
  return channel;
}
//