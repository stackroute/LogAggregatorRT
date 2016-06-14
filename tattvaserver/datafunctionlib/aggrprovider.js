var tattvaaggr= function(func){
  var aggrobj= require("./aggregator/"+func+"-aggregator.js");
  return new aggrobj();
}
module.exports=tattvaaggr;
