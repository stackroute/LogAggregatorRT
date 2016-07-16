var watchListTaskConfig = require('../watchlisttasks/watchlisttaskconfig');

const tplgyEventNames = {
  ON_START: "onStart",
  ON_DATA: "onData",
  ON_PARSE: "onParse",
  ON_EXPR: "onExpresion",
  ON_FINISH: "onWatchFinish"
};

var buildTopology = function(wlstDef) {

  var topology = [];

  topology.push({
    name: getTaskName(watchListTaskConfig.SOURCE_CONNECTOR, wlstDef.orgsite, wlstDef.name),
    type: watchListTaskConfig.SOURCE_CONNECTOR,
    subFrom: getChannelName(tplgyEventNames.ON_START, wlstDef.orgsite, wlstDef.name),
    pubTo: getChannelName(tplgyEventNames.ON_DATA, wlstDef.orgsite, wlstDef.name),
    watchlist: wlstDef.name,
    orgsite: wlstDef.orgsite,
    payload: {'watch': wlstDef}
  },{
    name: getTaskName(watchListTaskConfig.DATA_PRASER, wlstDef.orgsite, wlstDef.name),
    type: watchListTaskConfig.DATA_PRASER,
    subFrom: getChannelName(tplgyEventNames.ON_DATA, wlstDef.orgsite, wlstDef.name),
    pubTo: getChannelName(tplgyEventNames.ON_PARSE, wlstDef.orgsite, wlstDef.name),
    watchlist: wlstDef.name,
    orgsite: wlstDef.orgsite,
    payload: {'watch': wlstDef}
  });

  var exprEventName = "";
  for(i = 0; i <wlstDef.expressions.length; i++) {
    expr = wlstDef.expressions[i];

    subFrom = "";
    if(i == 0) {
      subFrom = getChannelName(tplgyEventNames.ON_PARSE, wlstDef.orgsite, wlstDef.name);
    } else {
      subFrom = getChannelName((tplgyEventNames.ON_EXPR + "::" + expr.parent), wlstDef.orgsite, wlstDef.name);
    }

    taskObj = {
      name: getTaskName((watchListTaskConfig.EXPRESSION_PROCESSOR + "::" + expr.tag), wlstDef.orgsite, wlstDef.name),
      type: watchListTaskConfig.EXPRESSION_PROCESSOR,
      subFrom: subFrom,
      pubTo: getChannelName((tplgyEventNames.ON_EXPR + "::" + expr.tag), wlstDef.orgsite, wlstDef.name),
      watchlist: wlstDef.name,
      orgsite: wlstDef.orgsite,
      payload: {'watch': wlstDef, 'expr': wlstDef.expressions[i]}
    };

    topology.push(taskObj);
  }

  var lastExpr = wlstDef.expressions[(wlstDef.expressions.length-1)];
  exprEventName = tplgyEventNames.ON_EXPR + "::" + lastExpr.tag;

  topology.push({
    name: getTaskName(watchListTaskConfig.WATCHLIST_REDUCER, wlstDef.orgsite, wlstDef.name),
    type: watchListTaskConfig.WATCHLIST_REDUCER,
    subFrom: getChannelName(exprEventName, wlstDef.orgsite, wlstDef.name),
    pubTo: getChannelName(tplgyEventNames.ON_FINISH, wlstDef.orgsite, wlstDef.name),
    watchlist: wlstDef.name,
    orgsite: wlstDef.orgsite,
    payload: {'watch': wlstDef}
  },{
    name: getTaskName(watchListTaskConfig.DATABASE_PUBLISHER, wlstDef.orgsite, wlstDef.name),
    type: watchListTaskConfig.DATABASE_PUBLISHER,
    subFrom: getChannelName(tplgyEventNames.ON_FINISH, wlstDef.orgsite, wlstDef.name),
    pubTo: "",
    watchlist: wlstDef.name,
    orgsite: wlstDef.orgsite,
    payload: {'watch': wlstDef}
  },{
    name: getTaskName(watchListTaskConfig.DASHBOARD_PUBLISHER, wlstDef.orgsite, wlstDef.name),
    type: watchListTaskConfig.DASHBOARD_PUBLISHER,
    subFrom: getChannelName(tplgyEventNames.ON_FINISH, wlstDef.orgsite, wlstDef.name),
    pubTo: "",
    watchlist: wlstDef.name,
    orgsite: wlstDef.orgsite,
    payload: {'watch': wlstDef}
  },{
    name: getTaskName(watchListTaskConfig.OUTSTREAM_PUBLISHER, wlstDef.orgsite, wlstDef.name),
    type: watchListTaskConfig.OUTSTREAM_PUBLISHER,
    subFrom: getChannelName(tplgyEventNames.ON_FINISH, wlstDef.orgsite, wlstDef.name),
    pubTo: "",
    watchlist: wlstDef.name,
    orgsite: wlstDef.orgsite,
    payload: {'watch': wlstDef}
  });

  return topology;
}

function getTaskName(taskType, orgSite, watchName) {
  var name = taskType + '::' + orgSite + '::' + ((watchName.trim()).replace(/\s/g, '_'));
  name = (name.toLowerCase()).trim();
  return name;
}

function getChannelName(eventName, orgSite, watchName) {
  var channel = 'watchlist' + '::' + eventName + '::' + orgSite + '::' + ((watchName.trim()).replace(/\s/g, '_'));
  channel = (channel.toLowerCase()).trim();
  return channel;
}

module.exports = {
  buildTaskTopology : buildTopology
};
