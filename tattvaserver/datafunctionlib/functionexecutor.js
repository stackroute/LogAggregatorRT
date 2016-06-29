var funcProvider = function(func,data){
  var datafnprovider= require("./datafnprovider");
  var dtobj=datafnprovider(func);
  return dtobj.evaluate(data);
}
module.exports=funcProvider;
