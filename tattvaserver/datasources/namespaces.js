var mongoose=require("mongoose");
var namespaceSchema= new mongoose.Schema({
  "name":{ type : String, required : true, unique: true, minlength: 2, maxlength: 30},
  "tag" :{ type: String, required:true, unique:true}

});

var namespace=mongoose.model('namespace', namespaceSchema);


module.exports = namespace;
