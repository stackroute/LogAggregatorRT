var watchlist_router = require('express').Router();
var watchlist = require('./watchlists.js');
var mongoose = require( 'mongoose' );
var ObjectId = mongoose.Types.ObjectId;

watchlist_router.use('/', function(req, res, next) {
  console.log(' watchlist use router invoked');
  next();
});

watchlist_router.get('/', function(req, res, next) {
  console.log(' watchlist router use invoked');
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
    console.log(savewatchlistdata);
  });
});
<!--end of save watchlist-->
<!--edit WatchList-->

watchlist_router.put('/:watchlistname',function (request, response) {
  var watchlistObj = request.body;
  watchlistObj.status="active";
  var o_id = ObjectId(watchlistObj._id);
  watchlist.find({_id: o_id}, function(err, wlist){
    if (err) {
      console.log(err);
      console.log("Error in find watchlist for update: ", watchlistObj._id, " name: ", watchlistObj.name);
      response.status(500).json({error: "unable to find the required watchlist for saving..!"});
    }
    console.log("Watchlist requested = ", wlist);
    watchlist.update({"_id":o_id}, watchlistObj, function(err, updatedObj) {
      if(err) {
        console.log("Error in updating: ", watchlistObj._id, " name: ", watchlistObj.name);
        console.error(err);
      }
      console.log("Updated Watchlists ",updatedObj.name);
      response.status(200).json(updatedObj);
    });
  });
});
<!--end of edit watchlist-->


watchlist_router.get('/:namespaceName', function(req, res){
  watchlist.find({namespace:req.params.namespaceName}, function(err, watchlistalldata){
    if(err)
    {
      console.error(err);
    }
    res.send(watchlistalldata);
  });
  console.log("Namespace list requested /n/n/n\n\n\n\n\n response successfully sent./n/n/n\n\n\n\n\n");
});
watchlist_router.get('/data/:watchlistName', function(req, res){
  watchlist.findOne({name:req.params.watchlistName}, function(err, watchlistalldata){
    if(err)
    {
      console.error(err);
    }
    res.send(watchlistalldata);
  });
});


watchlist_router.get('/stream',function(req,res,next){
  // console.log(req.param('namespace'));
  res.send('respond with a resource');
});


// watchlist_router.post('/',function (request, response) {
//   var watchlistObj = request.body;
//   watchlistObj.status="active";
//   console.log("reached watchlist with body data");
//   watchlistObj.id = watchlistObj.name;
//   var watchlist1 = new watchlist(watchlistObj);
//   watchlist1.save(function(err, savewatchlistdata){
//     if(err)
//     { return console.error(err);
//     }
//   });
// });

// watchlist_router.get('/namespace', function(req, res){
//   var name=req.param("name");
//   watchlist.findOne({name:"name"}, function(err, namespaceData){
//     if(err){
//       Object.keys(err.errors).forEach(function(key) {
//         var message = err.errors[key].message;
//         console.log('Validation error for "%s": %s', key, message);
//       });
//     }
//     else {
//       console.log(namespaceData);
//     }
//     console.log(namespaceData);
//   });
// });


module.exports = watchlist_router;
