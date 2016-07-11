var mongoose = require( 'mongoose' );

var OrgSchema  = mongoose.Schema({
  "orgName": {type : String, required : true, min:3 ,max : 50},
  "orgSite":{type : String, required : true, unique : true, index: true, min:3 ,max : 20},
  "orgLogo":{type : String, required : true},
  "orgLocation" : {type : String, required : true},
  "contactName" : {type : String, required : true,min:2 ,max : 50},
  "contactEmail": {type : String, required : true, unique : true, index:true}
},{collection: "organisations"});

// var Organisation = mongoose.model('Organisation', OrgSchema, "organisations");

module.exports = OrgSchema;
