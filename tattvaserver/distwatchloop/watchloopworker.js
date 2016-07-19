var buildTopology = function(wlstDef) {
  var topology = [];
  topology.push({
    type:"SourceConnector",
    subChannel: "watchlist::onStart" + "::" + wlstDef.orgsite + "::" + wlstDef.name,
    pubChannel: "watchlist::onData" + "::" + wlstDef.orgsite + "::" + wlstDef.name,
    watchlist: wlstDef.name,
    payload: {'watch': wlstDef}
  },{
    type:"ParseData",
    subChannel: "watchlist::onData" + "::" + wlstDef.orgsite + "::" + wlstDef.name,
    pubChannel: "watchlist::onParse" + "::" + wlstDef.orgsite + "::" + wlstDef.name,
    watchlist: wlstDef.name,
    payload: {}
  });

  for(i = 0; i <wlstDef.expressions.length; i++) {
    expr = wlstDef.expressions[i];

    subFrom = "";
    if(i == 0) {
      subFrom = "watchlist::onParse" + "::" + wlstDef.orgsite + "::" + wlstDef.name;
    } else {
      subFrom = "watchlist::onExpresion" + "::" + expr.parent + "::" + wlstDef.orgsite + "::" + wlstDef.name;
    }

    taskObj = {
      type:"ExpressionProcessor",
      subChannel: subFrom,
      pubChannel: "watchlist::onExpresion" + "::" + expr.tag + "::" + wlstDef.orgsite + "::" + wlstDef.name,
      watchlist: wlstDef.name,
      payload: {'watch': wlstDef, 'expr': wlstDef.expressions[i]}
    };
    topology.push(taskObj);
  }

  var lastExpr = wlstDef.expressions[(wlstDef.expressions.length-1)];

  topology.push({
    type:"WatchListReducer",
    subChannel: "watchlist::onExpresion" + "::" + lastExpr.tag + "::" + wlstDef.orgsite + "::" + wlstDef.name,
    pubChannel: "watchlist::onWatchFinish" + "::" + wlstDef.orgsite + "::" + wlstDef.name,
    watchlist: wlstDef.name,
    payload: {}
  },{
    type:"PublishToDashboard",
    subChannel: "watchlist::onWatchFinish" + "::" + wlstDef.orgsite + "::" + wlstDef.name,
    pubChannel: undefined,
    watchlist: wlstDef.name,
    payload: {}
  },{
    type:"PublishToOutputStream",
    subChannel: "watchlist::onWatchFinish" + "::" + wlstDef.orgsite + "::" + wlstDef.name,
    pubChannel: undefined,
    watchlist: wlstDef.name,
    payload: {}
  },{
    type:"PublishToDatabase",
    subChannel: "watchlist::onWatchFinish" + "::" + wlstDef.orgsite + "::" + wlstDef.name,
    pubChannel: undefined,
    watchlist: wlstDef.name,
    payload: {}
  });
  return topology;
}

module.exports = buildTopology;
