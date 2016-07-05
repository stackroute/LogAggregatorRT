var admin_routes = require('express').Router();

admin_routes.get('appPortfolio',function(req,res){

});

admin_routes.get('orgList',function(req,res){

});

admin_routes.get('getThisWatch',function(req,res){
  var orgSite = req.params.orgSite;
  var watchName = req.params.name;
});
