var evaluate=function(data)
{
  var max=0;
for(var i=0;i< data.length; i++)
{
  if(data[i]>max)
   max=data[i];

}
return max;
}



module.exports=evaluate;
