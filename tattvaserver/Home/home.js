var mongoose = require( 'mongoose' );

var sideNavSchema = new mongoose.Schema({
  "_id":{type: String},
  "menu":{type: String},
  "link":{type: String},
  "icon":{type: String},
  "children":
  [{
    "menu":{type:String},
    "link":{type:String}
  }]
});

var sidenavs = mongoose.model('sidenavs', sideNavSchema);
module.exports = sidenavs;
