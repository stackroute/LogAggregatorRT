var mongoose = require( 'mongoose' );
var Schema=mongoose.Schema;

var watchLoopSchema= new Schema({
      "orgsite":{type:String,required:true},
      "watchname":{type:String,required:true,unique:true},
      "status":{type:String,required:true,default:"active"},
      "execstatus":{type:String,required:true,default:"created"},
      "execstartedon":{type:String,default:Date.now},
      "execstoppedon":{type:String},
      "watcherrors": [
        {
        "timestamp":{type: Date,default:Date.now},
        "error":{type:String}
        }
      ]
    },{collection: "watchloops"});

// var watchloop = mongoose.model('watchloop', watchLoopSchema);
module.exports = watchLoopSchema;
