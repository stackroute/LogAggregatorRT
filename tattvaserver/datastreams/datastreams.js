var mongoose = require( 'mongoose' );

var datastreamSchema = new mongoose.Schema({
  "streamName": {type: String, required : true, unique: true, min: 2, max: 30},
  "description": {type: String, required : true},
  "namespace": {type: String, required : true},
  "dataSource": {type: String, required : true},
  "createdBy":String,
  "createdOn": {type: Date,default: Date.now},
  "editedBy":String,
  "editedOn": {type: Date,default: Date.now},
  "Query":
  [{
    "field": {type: String,required: true},
    "operator": {type: String,required: true},
    "value": {type: Number,required: true}
  }]
});


var Datastream = mongoose.model('Datastream', datastreamSchema);

module.exports = Datastream;
