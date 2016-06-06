var calledfn=function()
{
  this.evaluate=function(func,data)
  {
    console.log(func);
  var fn=require("./primitives/"+func+".js");
  var reqfn=new fn();
  reqfn.evaluate(data);
  }
}

module.exports=calledfn;
