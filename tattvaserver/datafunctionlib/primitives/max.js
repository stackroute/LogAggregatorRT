var max=function()
{
this.evaluate=function(data){
  var max=0;
for(var i=0;i< data.length; i++)
{
  if(data[i]>max)
   max=data[i];

}
console.log(max);
}


}


module.exports=max;
