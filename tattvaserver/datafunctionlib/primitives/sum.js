var sum= function()
{

this.evaluate=function(data)
{
  var sum=0;
  for(var i=0; i< data.length; i++)
  {
    sum+=data[i];
  }
console.log(sum);

};

}


module.exports=sum;
