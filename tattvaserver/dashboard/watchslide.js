var mongoose = require('mongoose');

// dbURL = 'mongodb://localhost/sampledatabase';
// mongoose.connect(dbURL);

var slideSchema2=new mongoose.Schema({
// username:{type:String,unique:true},
// orgname:{type:String},
defaultSlide:{type:String},
mySlides:[{
  slideName:{type:String},
  watchlists:{
    watch_id:{type:Number}

  }
}]
});
var watchslide =mongoose.model("watchslide",slideSchema2);
module.exports=watchslide;
