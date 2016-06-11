var router=require('express').Router();
// var WatchSlideModel = require('/dashboard/watchslide');
var path=require('path');
var watchslide=require('./watchslide.js');
//============ SLIDES =============
//Get a specific slide object belonging to a specific user
var slide2=new watchslide({
username:"rahul",
orgname:"wipro",
defaultSlide:"WifiSlide",
mySlides:{
  slideName:"ACslide",
  watchlists:{
    watchid:"12"
  }
}
});
// router.use(function(req,res,next)
// {
//   slide2.save(function (err,slide) {
//     //console.log("inside save funciton");
//     if (err) {
//       //console.log(err);
//     }
//     //console.log("slide is saved");
//   });
//   //console.log("before next");
//   next();
// });
router.post('/', function(req, res){
  //console.log("heleleoooo");
  res.send("This is your specific slide");
  // next();
});

module.exports=router;
//============ SLIDES =============
