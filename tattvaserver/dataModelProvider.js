var namespacesSchema = require("../namespace/namespace.js");
var organisationsSchema = require("../organisation/organisations.js");
var watchListSchema = require("../watchlists/watchlists.js");
var watchLoopSchema = require("../watchloop/watchloop.js");

var dataModelProvider = function(SchemaName,OrgSite){
  var modelObj = mongoose.model('modelObj',SchemaName);
  
}
