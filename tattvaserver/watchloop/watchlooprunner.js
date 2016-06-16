var WatchLoopModel = require ('./watchloop');
var WatchListModel = require ('../watchlists/watchlists');
var watchExecutor = require ('../watchexecutor/watchlistexecutor');

var loopRunner = function() {
  //for each watch list added in watchloop
  //get the watchlist definition from db
  //kick watchExecutor(wlstDef);

  var dataSource = {
    ipaddr: '172.23.238.253',
    port: '7070'
  };

  WatchLoopModel.find(function(err, watchEntries) {
    if(err) {
      console.log("Error in fetch watch list entries of watchloop ", err);
      return;
    }

    watchEntries.forEach(function(watchEntry){
      WatchListModel.findOne({name:watchEntry.watchname}, function(err, wlstDef){
        if(err) {
          console.log("Error in fetching watch list ", err);
          return;
        }
        watchExecutor(wlstDef, dataSource);
      });
    });
  });
}

module.exports = loopRunner;
