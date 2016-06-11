var tattva=require('./functionlib.js');
var calledfn=function()
{
  this.evaluate=function(func,data)
 {
  //  var result=tattva.sum(data);
  //  //console.log(result);

  var fn=require("./primitives/"+func+".js");
 return fn(data);

  }
}

module.exports=calledfn;
