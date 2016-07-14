var watchlist_router = require('express').Router();
var WatchListSchema = require('./watchlists.js');
var dataProvider = require('../core/datamodelprovider');
// var mongoose = require( 'mongoose' );
// var ObjectId = mongoose.Types.ObjectId;

<!--save WatchList-->
watchlist_router.post('/',function (request, response) {
  var watchlistObj = request.body;
  watchlistObj.status="active";
  watchlistObj.orgsite=request.user.orgsite;
  watchlistObj.createdBy= req.user.email,
  watchlistObj.createdOn= new Date(),
  watchlistObj.editedBy= req.user.email,
  watchlistObj.editedOn= new Date()
  //console.log("reached watchlist with body data");
  watchlistObj.id = watchlistObj.name;
  var WatchListModel = dataProvider.getModel(WatchListSchema, request.user.orgsite);
  var watchlist1 = new WatchListModel(watchlistObj);
  watchlist1.save(function(err, savewatchlistdata){
    if(err) {
      console.log("Error in saving watch list, error:", err);
      return response.status(400).json({error:"Internal error in completing the operation"});
    }
    //console.log(savewatchlistdata);
    return response.status(200).json(savewatchlistdata);
  });
});
<!--end of save watchlist-->
<!--edit WatchList-->

watchlist_router.put('/:watchlistname',function (request, response) {
  var watchlistObj = request.body;
  watchlistObj.status="active";
  // var o_id = ObjectId(watchlistObj._id);
  var watchname=watchlistObj.name;
  var WatchListModel = dataProvider.getModel(WatchListSchema, request.user.orgsite);
  WatchListModel.find({name: watchname}, function(err, wlist){
    if (err) {
      //console.log(err);
      console.log("Error in find watchlist for update: ", watchlistObj._id, " name: ", watchlistObj.name);
      response.status(500).json({error: "unable to find the required watchlist for saving..!"});
    }
    else{
        watchlistObj.editedBy= request.user.email,
        watchlistObj.editedOn= new Date()
      }
    WatchListModel.update({"name":watchname}, watchlistObj, function(err, updatedObj) {
      if(err) {
        //console.log("Error in updating: ", watchlistObj._id, " name: ", watchlistObj.name);
        console.error("Error in updating watchlist, error:", err);
        response.status(500).json({error: "Internal error occurred in completing operation..!"});
      }
      //console.log("Updated Watchlists ",updatedObj.name);
      response.status(200).json(updatedObj);
    });
  });
});
<!--end of edit watchlist-->

// watchlist_router.delete('/:watchlistname',function (request, response) {
//   var watchname=request.params.watchlistname;
//   var WatchListModel = dataProvider.getModel(WatchListSchema, request.user.orgsite);
//   WatchListModel.find({"name": watchname}, function(err, wlist){
//     if (err) {
//       response.status(500).json({error: "unable to find the required watchlist for deleting..!"});
//     }
//     WatchListModel.remove({ "name":watchname }, function(err) {
//       if(err) {
//         console.error("Error in removing watchlist, error:", err);
//         response.status(500).json({error: "Internal error occurred in completing operation..!"});
//       }
//       response.status(200).json("success");
//     });
//   });
// });
// <!--end of remove watchlist-->

watchlist_router.get('/:namespaceName', function(req, res){
  var WatchListModel = dataProvider.getModel(WatchListSchema, req.user.orgsite);
  WatchListModel.find({namespace:req.params.namespaceName}, function(err, watchlistalldata){
    if(err){
      console.error("Error in finding watchlist, error:", err);
      return res.status(500).json({error: "Internal error occurred..!"});
    }
    return res.send(watchlistalldata);
  });
  //console.log("Namespace list requested /n/n/n\n\n\n\n\n response successfully sent./n/n/n\n\n\n\n\n");
});
watchlist_router.get('/data/:watchlistName', function(req, res){
  var WatchListModel = dataProvider.getModel(WatchListSchema, req.user.orgsite);
  WatchListModel.findOne({name:req.params.watchlistName}, function(err, watchlistalldata){
    if(err) {
      console.error("Error occurred in finding watch list, error:", err);
      return res.status(500).json({error:"Internal error occurred ..!"});
    }
    return res.send(watchlistalldata);
  });
});

watchlist_router.get('/stream',function(req,res,next){
  // //console.log(req.param('namespace'));
  res.send('respond with a resource');
});


// watchlist_router.post('/',function (request, response) {
//   var watchlistObj = request.body;
//   watchlistObj.status="active";
//   //console.log("reached watchlist with body data");
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
//         //console.log('Validation error for "%s": %s', key, message);
//       });
//     }
//     else {
//       //console.log(namespaceData);
//     }
//     //console.log(namespaceData);
//   });
// });


module.exports = watchlist_router;
