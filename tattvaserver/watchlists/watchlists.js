var mongoose = require( 'mongoose' );
var watchListSchema=new mongoose.Schema({
  "name": {type: String, required : true,index:true,min:"1"},
  "description": {type: String, required : true,min:"2"},
  "namespace":{type: String, required : true,ref:"namespace"},
  "stream": {type: String, required : true},
  "status":{type:String,required:true},
  "expressions": [
    {
      "tag": {type: String, required : true},
      "joinWith":{type: String},
      "joinBy":{type: String},
      "outcomeForwarding":{type: String},
      "labelData":{type: String},
      "watch": {
        "lfield": {
          "fieldType": {type: String, required : true},
          "Constants":{type: String},
          "function":{type: String},
          "functionparam": {type: String},
          "AccumulateOn": {type: String},
          "AccumulateTill": {type: String},
          "FunctionenPostAccumulation": {type: String},
          "FunctionenPostAccumulationParam": {type: String},
          "historicfunction": {type: String},
          "historicfunctionparam":{type:String},
          "inputvalue":{type: Number},
          "DataField" :{type:String},
          "exprAsText": {type: String, required : true}
        },
        "rfield": {
          "fieldType": {type: String, required : true},
          "Constants":{type: String},
          "function":{type: String},
          "functionparam": {type: String},
          "AccumulateOn": {type: String},
          "AccumulateTill": {type: String},
          "FunctionenPostAccumulation": {type: String},
          "FunctionenPostAccumulationParam": {type: String},
          "historicfunction": {type: String},
          "historicfunctionparam":{type:String},
          "inputvalue":{type: Number},
          "DataField" :{type:String},
          "exprAsText": {type: String, required : true}
        },
        "operator":{type: String, required : true}
      }
    }
  ],
  "publishers" :{
    "dashboard": {  "logFormat":{type:String},
                    "displaySize":{type:String},
                    "graphType":{type:String},
                    "tabs":[
                    {
                    "graph":{type:Boolean},
                    "logData":{type:Boolean},
                    "flowMap":{type:Boolean}
                    }
                  ]
                  },
      'database' : {
        "saveas": {type: String}
      },
      'outstream' : {
        "streamname" : {type: String}
      }
  }

  });
var watchlist = mongoose.model('watchlist', watchListSchema);
module.exports = watchlist;
