module.exports=function()
{

  function execute(data)
    {
      var max=0;
    for(var i=0;i< data.length; i++)
    {
      if(data[i]>max)
       max=data[i];

    }
    return max;
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
