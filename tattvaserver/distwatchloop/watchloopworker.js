var WatchlistWorkers = function(wlstDef) {

    var workerArray = [];

  workerArray.push({
    type:"SourceConnector",
    subChannel: "watchlist::onStart::" + wlstDef.orgsite + "::" + wlstDef.name,
    pubChannel: "watchlist::onData::" + wlstDef.orgsite + "::" + wlstDef.name,
    watchlist: wlstDef.name,
    payload:""
  },{
    type:"ParseData",
    subChannel: "watchlist::onData::" + wlstDef.orgsite + "::" + wlstDef.name,
    pubChannel: "watchlist::onParse::" + wlstDef.orgsite + "::" + wlstDef.name,
    watchlist: wlstDef.name,
    payload:""
  });

  for(i = 0; i <wlstDef.expressions.length; i++){
    expr = wlstDef.expressions[i];

    subFrom = "";
    if(i == 0) {
      subFrom = "watchlist::onParse::" + wlstDef.orgsite + "::" + wlstDef.name;
    } else {
      subFrom = "watchlist::on" + expr.parent + "::" + wlstDef.orgsite + "::" + wlstDef.name;
    }

    taskObj = {
      type:"ExpressionProcessor",
      subChannel: subFrom,
      pubChannel: "watchlist::onExpr" + expr.tag + "::" + wlstDef.orgsite + "::" + wlstDef.name,
      watchlist: wlstDef.name,
      payload: expr.field
    };
    workerArray.push(taskObj);
  }

workerArray.push({
    type:"PublishToDashboard",
    subChannel: "watchlist::on" + expr.tag + "::" + wlstDef.orgsite + "::" + wlstDef.name,
    pubChannel: undefined,
    watchlist: wlstDef.name,
    payload:""
  },{
    type:"PublishToOutputStream",
    subChannel: "watchlist::on" + expr.tag + "::" + wlstDef.orgsite + "::" + wlstDef.name,
    pubChannel: undefined,
    watchlist: wlstDef.name,
    payload:""
  },{
    type:"PublishToDatabase",
    subChannel: "watchlist::on" + expr.tag + "::" + wlstDef.orgsite + "::" + wlstDef.name,
    pubChannel: undefined,
    watchlist: wlstDef.name,
    payload:""
  });

  return workerArray;
}
module.exports = WatchlistWorkers;
