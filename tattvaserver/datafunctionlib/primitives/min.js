var evaluate=function(data)
{

  var min=data[0];
for(var i=1;i< data.length; i++)
{
  if(data[i]<min)
   min=data[i];

}
return min;
}



module.exports=evaluate;
