var mongoose = require( 'mongoose' );
var watchexecutorSchema=new mongoose.Schema({
  "orgsite": {type: String, required : true,ref:"organisation"},
  "watches": [
    {
      "watchid": {type: String, required : true},
      "watchname":{type: String,required:true},
      "status":{type: String,required:true},
      "execstartedon":{type: String,required:true},
      "execstoppedon":{type: String},
      "errors":[
        "timestamp":{type:Date},
        "error":{type:String}
                ]
    }
              ]
});
var watchexecutor = mongoose.model('watchexecutor', watchexecutorSchema);
module.exports = watchexecutor;
