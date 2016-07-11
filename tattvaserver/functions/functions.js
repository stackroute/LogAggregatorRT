var mongoose = require( 'mongoose' );

var functionSchema = new mongoose.Schema({
  "_id" :{type:String},
  "orgsite":{type:String,required:true},
  "name":{type: String, required:true, unique:true, min:2, max:20},
  "description":{type: String},
  "fnvartype":[
    {
    "var":{type:String},
    "value":{type:Boolean, default:false}
  }],
  "variables":{type:String},
  "code" : {type:String},
  "createdBy":{type:String},
  "createdOn": { type : Date, default : Date.now },
  "editedBy":{type:String},
  "editedOn": { type : Date, default : Date.now }
},{collection: "functions"});

// var functions = mongoose.model('functions', functionSchema);
module.exports = functionSchema;
