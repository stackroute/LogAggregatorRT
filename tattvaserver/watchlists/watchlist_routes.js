var watchlist_router = require('express').Router();
var watchlist = require('./watchlists.js');


watchlist_router.get('/:namespaceName', function(req, res){
  console.log(req.params.namespaceName);
  watchlist.find({namespace:req.params.namespaceName}, function(err, watchlistalldata){
    if(err)
    {
      console.error(err);
    }
    console.log(watchlistalldata);
    res.send(watchlistalldata);
  });
});


  watchlist_router.get('/stream',function(req,res,next){
    console.log(req.param('namespace'));
    res.send('respond with a resource');
  });


  watchlist_router.post('/',function (request, response) {
    var watchlistObj = request.body;
    watchlistObj.status="active";
    console.log("reached watchlist with body data");
    watchlistObj.id = watchlistObj.name;
    var watchlist1 = new watchlist(watchlistObj);
    watchlist1.save(function(err, savewatchlistdata){
      if(err)
      { return console.error(err);
      }
    });
  });


  watchlist_router.get('/namespace', function(req, res){
    var name=req.param("name");
    watchlist.findOne({name:"name"}, function(err, namespaceData){
      if(err){
        Object.keys(err.errors).forEach(function(key) {
          var message = err.errors[key].message;
          console.log('Validation error for "%s": %s', key, message);
        });
      }
      else {
        console.log(namespaceData);
      }
      console.log(namespaceData);
    });
  });


  module.exports = watchlist_router;
