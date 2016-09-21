module.exports=function()
{
  var functionProvider = require("../datafnprovider");
  
  return{
    execute : function(functionObject, paramObj) {
     var result=[];
     var i=0;
     if(functionObject != undefined){
       if(functionObject[0] != undefined){
         for(expr in functionObject[0].expression)
         {
          if(expr < functionObject[0].expression.length){
            var fnParamData=[];

            fnParamData.push(paramObj[functionObject[0].expression[expr].lhs.varmap[0].targetvar]);
            fnParamData.push(paramObj[functionObject[0].expression[expr].lhs.varmap[1].targetvar]);
            var functionModule = new functionProvider(functionObject[0].expression[expr].lhs.name);
            var lhs = functionModule.evaluate(fnParamData);

            var fnParamData=[];
            fnParamData.push(paramObj[functionObject[0].expression[expr].rhs.varmap[0].targetvar]);
            fnParamData.push(paramObj[functionObject[0].expression[expr].rhs.varmap[1].targetvar]);
            var functionModule = new functionProvider(functionObject[0].expression[expr].rhs.name);
            var rhs = functionModule.evaluate(fnParamData);

            if(functionObject[0].expression[expr].operator.name=="ADD +")
            {
              result[i]= lhs.output+rhs.output;
            }
            if(functionObject[0].expression[expr].operator.name=="SUB -")
            {
              result[i]= lhs.output-rhs.output;
            }
            if(functionObject[0].expression[expr].operator.name=="MUL *")
            {
              result[i]= lhs.output*rhs.output;
            }
            if(functionObject[0].expression[expr].operator.name=="DIV /")
            {
              result[i]= lhs.output/rhs.output;
            } 
            i++;
            result[i]=functionObject[0].expression[expr].join_By.name; 
            i++;
          }
        }
      }
    }
    var final={};
    final.error = false;
    if(result.length>2){
      for(var j=1;j<result.length;j=j+2)
      {
        if(result[j]=="ADD +")
        {

          result[j+1]=result[j-1]+result[j+1];
          final.output=result[j+1];
        }
        if(result[j]=="SUB -")
        {
         result[j+1]=result[j-1]-result[j+1];
         final.output=result[j+1];
       }
       if(result[j]=="MUL *")
       {
         result[j+1]=result[j-1]*result[j+1];
         final.output=result[j+1];
       }
       if(result[j]=="DIV /")
       {
         result[j+1]=result[j-1]/result[j+1];
         final.output=result[j+1];
       } 
     }
   }
   else
   {
    final.output=result[0];
  }
  return final;
}
}
}