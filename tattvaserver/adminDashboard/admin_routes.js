var admin_routes = require('express').Router();
var OrgSchema = require('../organisation/organisations.js');
var watchListSchema = require('../watchlists/watchlists.js');
var dataModelProvider = require('../core/datamodelprovider');

admin_routes.get('/',function(req,res){
});

admin_routes.get('/appPortfolio',function(req,res){
  var orgModel = dataModelProvider.getModel(OrgSchema,"tattva");
  orgModel.find({},function(err,data){
    if(err){
      console.log("AppPortfolio get request error:",err);
      res.status(500).json({error:"Internal error occurred"});
    }
    return res.send(data);
  })
});

admin_routes.get('/getWatchlists/:orgSite',function(req,res){
  console.log("params to getWatchlist:",req.params);
  var watchModel = dataModelProvider.getModel(watchListSchema,req.params.orgSite);
  watchModel.find({},function(err,data){
    if(err){
      console.log("Watchlists get request error for "+orgSite+" error:",err);
      res.status(500).json({error:"Internal Server Error"});
    }
    return res.send(data);
  })
});

admin_routes.get('/getThisWatch',function(req,res){
  var orgSite = req.params.orgSite;
  var watchName = req.params.name;
});

module.exports = admin_routes;
