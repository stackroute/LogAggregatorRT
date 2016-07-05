var mongoose = require('mongoose');

var watchslideSchema=new mongoose.Schema({
  username:{type:String, require:true, unique: true},
  orgsite:{type:String, require:true},
  defaultSlide:{type:String, require:true, default:'org'},
  mySlides:[{
    slidename:{type:String, require:true},
    watchlists:{type:Array}
  }]
  // mySlides:{type:Array}
},{collection: "watchslides"});
// var watchslide =mongoose.model("watchslide",slideSchema2);
module.exports=watchslideSchema;
