var mongoose = require( 'mongoose' );

var streamSchema=new mongoose.Schema({
  "description": {type: String},
"instance":{type:String},
  "namespace":{type: String,ref:"namespace"},
  "streamname": {type: String},
  "status":{type:String,required:true},
  "query": [
    {
"_id":{type:String},
"fieldName":{type:String},
"user_operator":{type:String},
"user_value":{type:String}
}
]
  });
var stream = mongoose.model('stream', streamSchema);
module.exports = stream;
