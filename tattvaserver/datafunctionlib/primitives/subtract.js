module.exports=function()
{
  function execute(a, b)
  {
    var result=a-b;
    return result;
  }
return {

 //evaluate fn
 evaluate: function(data)
  {
    var result={};
    result.error=false;
    if(data.length!=2)
    {
      result.error=true;
      return result;
    }
    else{
      var op1=data[0];
      var op2=data[1];
      result.output=execute(op1,op2);
      return result;
    }
  }

}

}
