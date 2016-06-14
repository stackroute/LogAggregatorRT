module.exports=function()
{
  function execute(data)
  {
    var len=data.length;
    var i=0;
    var sum=0;
    for(i=0;i<len;i++)
    {
        sum=sum+parseInt(data[i]);
    }

    return sum;
  }

  return {

   //evaluate fn
   evaluate: function(data)
    {
      return execute(data);
      }
    }

  }
