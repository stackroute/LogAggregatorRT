const srcConnectorTask = require('./sourceconnector/sourceconnecttask');
const dataParserTask = require('./dataparser/dataparsetask');
const exprProcTask = require('./expressionprocessor/expprocesstask');
const watchReducerTask = require('./watchlistreducer/watchlistreducertask');
const dashPublisherTask = require('./publisherdashboard/publisherdashboard');
const outPublisherTask = require('./publisheroutstream/publishoutstream');
const dbPublisherTask = require('./publisherdatabase/publisherdatabase');

const watchtaskconfig = require('./watchlisttaskconfig');

var taskTypeWorkerMap = {};
taskTypeWorkerMap[watchtaskconfig.SOURCE_CONNECTOR] = srcConnectorTask;
taskTypeWorkerMap[watchtaskconfig.DATA_PRASER] = dataParserTask;
taskTypeWorkerMap[watchtaskconfig.EXPRESSION_PROCESSOR] = exprProcTask;
taskTypeWorkerMap[watchtaskconfig.WATCHLIST_REDUCER] = watchReducerTask;
taskTypeWorkerMap[watchtaskconfig.DASHBOARD_PUBLISHER] = dashPublisherTask;
taskTypeWorkerMap[watchtaskconfig.OUTSTREAM_PUBLISHER] = outPublisherTask;
taskTypeWorkerMap[watchtaskconfig.DATABASE_PUBLISHER] = dbPublisherTask;

var watchTaskProvider = function(taskType) {
    var taskModule = taskTypeWorkerMap[taskType];
    return taskModule;
}

module.exports = {
    taskWorkerMap: taskTypeWorkerMap,
    getProvider: watchTaskProvider
};