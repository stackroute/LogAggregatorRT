var mongoose = require('mongoose');
var watchListSchema = new mongoose.Schema({
  "name": { type: String, unique: true, required: true, index: true, min: "1" },
  "description": { type: String, required: true, min: "2" },
  "namespace": { type: String, required: true },
  "stream": { type: String, required: true },
  "status": { type: String, required: true },
  "orgsite": { type: String, required: true },
  "createdBy": { type: String },
  "createdOn": { type: Date, default: Date.now },
  "editedBy": { type: String },
  "editedOn": { type: Date, default: Date.now },
  "expressions": [{
    "tag": { type: String, required: true },
    "parent": { type: String },
    "child": { type: String },
    "joinBy": { type: String },
    "outcomeForwarding": { type: String },
    "labelData": { type: String },
    "watch": {
      "lfield": {
        "fieldType": { type: String, required: true },
        "Constants": { type: String },
        "function": { type: String },
        "functionparam": { type: String },
        "functionparameters": { type: Object },
        "AccumulateOn": { type: String },
        "AccumulateTill": { type: String },
        "FunctionenPostAccumulation": { type: String },
        "FunctionenPostAccumulationParam": { type: String },
        "historicfunction": { type: String },
        "historicfunctionparam": { type: String },
        "inputvalue": { type: Number },
        "DataField": { type: String },
        "exprtag": { type: String },
        "exprAsText": { type: String, required: true }
      },
      "rfield": {
        "fieldType": { type: String, required: true },
        "Constants": { type: String },
        "function": { type: String },
        "functionparam": { type: String },
        "functionparameters": { type: Object },
        "AccumulateOn": { type: String },
        "AccumulateTill": { type: String },
        "FunctionenPostAccumulation": { type: String },
        "FunctionenPostAccumulationParam": { type: String },
        "historicfunction": { type: String },
        "historicfunctionparam": { type: String },
        "inputvalue": { type: Number },
        "DataField": { type: String },
        "exprtag": { type: String },
        "exprAsText": { type: String, required: true }
      },
      "operator": { type: String, required: true }
    }
  }],
  "publishers": {
    "dashboard": {
      "logFormat": { type: String },
      "displaySize": { type: String },
      "graphType": { type: String },
      "tabs": { type: Array },
      "xaxis": { type: String },
      "yaxis": { type: String }
    },
    'database': {
      "saveas": { type: String }
    },
    'outstream': {
      "streamname": { type: String }
    }
  }

}, { collection: "watchlists" });
// var watchlist = mongoose.model('watchlist', watchListSchema);
module.exports = watchListSchema;
