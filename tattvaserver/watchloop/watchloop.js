var mongoose = require( 'mongoose' );
var Schema=mongoose.Schema;

var watchLoopSchema= new Schema({
    //  "watchid": {type:Schema.Types.ObjectId,ref: 'watchlists'},
      "orgsite":{type:String,required:true},
      "watchname":{type:String,required:true,unique:true},
      "execstatus":{type:String,required:true,default:"active"},
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
