var mongoose = require( 'mongoose' );
var Schema=mongoose.Schema;

var watchLoopSchema= new Schema({
      "watchid": {type:Schema.Types.ObjectId,ref: 'watchlists'},
      "watchname":{type:String,required:true},
      "execstatus":{type:String,required:true,default:"active"},
      "execstartedon":{type:String,default:Date.now},
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
