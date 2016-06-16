module.exports=function()
{
  function execute(data)
  {
    var len=data.length;
    var i=0;
    var sum=0;
    var avg=0;

    for(i=0;i<len;i++)
    {
        var k=parseInt(data[i]);
        sum=sum+k;
    }
    avg=sum/len;
    return avg;
  }

  return {

   //evaluate fn
   evaluate: function(data)
    {
      return execute(data);
      }
    }

  }
