module.exports=function()
{

  function execute(data)
  {
    var min=data[0];
  for(var i=1;i< data.length; i++)
  {
    if(data[i]<min)
     min=data[i];

  }
  return min;
  }

  return {

   //evaluate fn
   evaluate: function(data)
    {
      var result={};
      result.error=false;
        result.output=execute(data);
        return result;
      }
    }

  }
