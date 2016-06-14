module.exports=function()
{
  function execute(data)
  {
    var len=data.length;
    return len;
  }

  return {

   //evaluate fn
   evaluate: function(data)
    {
      return execute(data);
      }
    }

}
