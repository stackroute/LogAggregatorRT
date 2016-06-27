var mongoose=require("mongoose");
var Schema=mongoose.Schema;
var errorSchema= new Schema({
  "e"
  });

var datasource=mongoose.model('datasource', datasourceSchema);


module.exports = datasource;
