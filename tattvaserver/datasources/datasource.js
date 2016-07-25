var mongoose=require("mongoose");
var Schema=mongoose.Schema;
var datasourceSchema= new Schema({
  "name":{ type : String, required : true, unique: true, minlength: 2, maxlength: 30},
  "orgsite":{type:String,required:true},
  // "tag" :{ type: String, required:true, unique:true},
  // "nsid":{type: Schema.Types.ObjectId , ref: 'namespace' ,required : true},
  "namespace":{type: String, required : true},
  "ipaddr":{type: String, required : true},
  "port":{type: Number, required : true, minlength: 1, maxlength: 5},
  "description":{type: String},
  "location":{type: String, required : true},
  "createdBy":String,
  "createdOn": { type : Date, default : Date.now },
  "editedBy":String,
  "editedOn": { type : Date, default : Date.now }}
  ,{collection: "datasources"});

// var datasource=mongoose.model('datasource', datasourceSchema);
module.exports = datasourceSchema;
