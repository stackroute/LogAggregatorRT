var mongoose = require( 'mongoose' );

var namespaceSchema = new mongoose.Schema({
  "name":{type : String, required : true, unique:true, min:2, max:30},
  // "tag":{type : String, required : true, unique:true},
  "dataSchema":[
    {
      "alias":{type: String, required : true},
      "name":{type: String, required : true},
      "type":{type: String, default:"dimension"}
    }
  ],
  "status":{type:String, default:"active"},
  "description":{ type : String},
  "createdBy":String,
  "createdOn": { type : Date, default : Date.now },
  "editedBy":String,
  "editedOn": { type : Date, default : Date.now }
});

var Namespace = mongoose.model('Namespace', namespaceSchema);

module.exports = Namespace;
