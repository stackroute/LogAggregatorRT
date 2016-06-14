var tattva= function(func){
  var fnobj= require("./primitives/"+func);
  return new fnobj();
}
module.exports=tattva;
