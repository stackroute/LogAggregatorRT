module.exports=function()
{
  function execute(data)
  {
    var max=0;
    for(var i=0;i<data.length;i++)
    {
        data[i]=parseInt(data[i]);
    }
    max = Math.min.apply(null, data);
    return max;
  }

  return {

   //evaluate fn
   evaluate: function(data)
    {
      return execute(data);
      }
    }

  }
