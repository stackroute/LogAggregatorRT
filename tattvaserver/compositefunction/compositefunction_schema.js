var mongoose = require( 'mongoose' );
var compositeFunctionSchema = new mongoose.Schema({
	"name":{type:String},
	"description": {type:String},
	"parameters":[{"id":{type:String},
  "name":{type:String}
  }],
"returnresult":{type:String},
"expression": [
    { "tag": {type:String},
     "lhs": {
      "type": {type:String},
      "name": {type:String},
      "varmap": [
        {
          "srcvar": {type:String},
          "targetvar": {type:String}
        },
        {
          "srcvar": {type:String},
          "targetvar": {type:String}
        }
      ]
    },
     "operator": {
      "type": {type:String},
      "tag": {type:String},
      "name": {type:String}
    },
     "rhs": {
      "type": {type:String},
      "tag": {type:String},
      "name": {type:String},
      "varmap": [
        {
          "srcvar": {type:String},
          "targetvar": {type:String}
        },
        {
          "srcvar": {type:String},
          "targetvar": {type:String}
        }
      ]
    },
   "join_By":{
    "type":{type:String},
    "name":{type:String}
   }}]
},{collection: "compositefunctions"});
module.exports = compositeFunctionSchema;