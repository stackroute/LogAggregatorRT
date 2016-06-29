module.exports=function(accumulator)
{
  var acc=require("./accumulators/accumulateby"+accumulator);
  return new acc();
}
