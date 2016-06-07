var mongoose = require( 'mongoose' );

var streamSchema=new mongoose.Schema({
  "streamname": {type: String},
  "description": {type: String},
  "namespace":{type: String,ref:"namespace"},
  "createdBy":{type:String},
  "createdOn":{type:Date},
  "editedBy":{type:String},
  "editedOn":{type:Date},
  "instance":{type:String},
  "status":{type:String,required:true},
  "query": [
    {
      "_id":{type:String},
      "user_fields":{type:String},
      "user_operator":{type:String},
      "user_value":{type:String}
    }
  ]
});
var stream = mongoose.model('stream', streamSchema);
module.exports = stream;
