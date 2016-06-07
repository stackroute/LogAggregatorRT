var tattva= function(){
var sum=function(data){
  var sumreq=require("./primitives/sum.js");
  return new sumreq(data);
}
var max=function(data){
 var maxreq=require("./primitives/max.js");
 return new maxreq(data);
}
var min=require("./primitives/min.js");
var modulo=require("./primitives/modulo.js");
var substraction=require("./primitives/substraction.js");
var divide=require("./primitives/divide.js");
}

module.exports=tattva;
