module.exports=function()
{

  function execute(data)
  {
    var result=0;
   for(var i=0; i < (data).length; i++)
   {
     result+=data[i];
   }
    return result;
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
