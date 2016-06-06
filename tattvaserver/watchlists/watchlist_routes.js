var watchlist_router = require('express').Router();
var watchlist = require('./watchlists.js');


watchlist_router.get('/stream',function(req,res,next){
  console.log(req.param('namespace'));
  res.send('respond with a resource');
})

watchlist_router.use('/', function(req, res, next) {
  console.log('router use invoked');
  res.send("hi");
  next();
});
watchlist_router.get('/', function(req, res, next) {
  console.log('router use invoked');
  next();
});

<!--save WatchList-->
watchlist_router.post('/',function (request, response) {
  var watchlistObj = request.body;
  watchlistObj.status="active";
  console.log("reached watchlist with body data");
  watchlistObj.id = watchlistObj.name;
  var watchlist1 = new watchlist(watchlistObj);
  watchlist1.save(function(err, savewatchlistdata){
    if(err) return console.error(err);
  });
});
<!--end of save watchlist-->


// watchlist_router.get('/namespace', function(req, res){
//   var name=req.param("name");
//   watchlist.findOne({name:"name"}, function(err, namespaceData){
//     if(err) console.error(err);
//     else {
//       console.log(namespaceData);
//     }
//   });
// });


module.exports = watchlist_router;
