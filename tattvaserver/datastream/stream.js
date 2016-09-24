var mongoose = require( 'mongoose' );

var streamSchema=new mongoose.Schema({
  "orgsite":{type:String,required:true},
  "streamname": {type: String, required: "true", unique: true},
  "description": {type: String},
  "namespace":{type: String},
  "instance":{type:String},
  "createdBy":{ type: String},
  "createdOn": { type : Date, default : Date.now },
  "editedBy": { type: String },
  "editedOn": { type : Date, default : Date.now },
  "status":{type:String, required:true},
  "query": [
    {
      "_id":{type:String},
      "user_fields":{type:String},
      "user_operator":{type:String},
      "user_value":{type:String}
    }
  ]
},{collection: "streams"});
// var stream = mongoose.model('stream', streamSchema);
module.exports = streamSchema;
