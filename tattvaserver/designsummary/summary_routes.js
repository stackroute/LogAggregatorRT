var asyncModel = require('async');
var summary_router = require('express').Router();
var StreamModel = require('../datastream/stream.js');
var NamespaceModel = require('../namespace/namespaces.js');
var datasourceModel = require('../datasources/datasource.js');
var WatchlistModel = require('../watchlists/watchlists.js');
var ActiveWatchlistModel = require('../watchloop/watchloop.js');

var summaryStats = [];
summary_router.get('/',function(req, res, next){

  asyncModel.parallel( [

    function namespace(callback){
      NamespaceModel.count(function(err,count){
        callback(null,{name:"namespace", value: count});
      })
    },

    function datasource(callback){
      datasourceModel.count(function(err,count){
        callback(null,{name:"datasource", value: count});
      });
    },

    function stream(callback){
      StreamModel.count(function(err,count){
        callback(null, {name:"streams", value: count});
      });
    },


    function watchlist(callback){
      WatchlistModel.count(function(err,count){
        callback(null,{name:"watchlist", value: count});
      });
    },

    function activewatchlist(callback){
      ActiveWatchlistModel.count(function(err,count){
        callback(null,{name:"activewatchlist", value: count});
      });
    }
  ],
  function(err,summeryStats){
    //console.log("Hello",summeryStats);
    res.status(200).json(summeryStats);
  });
});

module.exports = summary_router;
