var mongoose = require( 'mongoose' );

var historicQuerySchema = new mongoose.Schema({
  "name":{type: String, unique:true, required:true},
  "description":{type: String, required:true},
  "watchlist":{type:String,required:true},
  "orgsite":{type:String,required:true},
  "queryCriteria":{type:Array},
  "outputFields":{type:Array,required:true},
  "toDateTime":{type:Date,required:true},
  "fromDateTime":{type:Date,required:true}
},{collection: "historicQuery"});

module.exports = historicQuerySchema;
