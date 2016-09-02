var mongoose = require( 'mongoose' );

var historicfunctionSchema = new mongoose.Schema({
  "name":{type: String, required:true, unique:true},
  "description":{type: String},
  "watchlist":{type:String,required:true},
  "namespace":{type:String,required:true},
  "organization":{type:String,required:true},
  "condition":{type:Array,required:true},
  "requiredData":{type:Array,required:true},
  "toDateTime":{type:Date,required:true},
  "fromDateTime":{type:Date,required:true}
},{collection: "historicfunctions"});

module.exports = historicfunctionSchema;
