var mongoose = require('mongoose');

// dbURL = 'mongodb://localhost/sampledatabase';
// mongoose.connect(dbURL);

var slideSchema2=new mongoose.Schema({
  username:{type:String, require:true, unique: true},
  orgsite:{type:String, require:true},
  defaultSlide:{type:String, require:true, default:'org'},
  mySlides:[{
    slidename:{type:String, require:true},
    watchlists:{type:Array}
  }]
  // mySlides:{type:Array}
});
var watchslide =mongoose.model("watchslide",slideSchema2);
module.exports=watchslide;
