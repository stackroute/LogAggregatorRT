var mongoose = require( 'mongoose' );
var Schema=mongoose.Schema;

var watchLoopSchema= new Schema({
      "watchid": {type:String,required : true},
      "watchname":{type:String,required:true},
      "execstatus":{type:String,required:true},
      "execstartedon":{type:String,required:true},
      "execstoppedon":{type:String},
      "watcherrors": [
        {
        "timestamp":{type: Date,default:Date.now},
        "error":{type:String}
        }
      ]
    });

var watchloop = mongoose.model('watchloop', watchLoopSchema);
module.exports = watchloop;
