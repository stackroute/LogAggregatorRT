module.exports=function()
{
  var functionProvider = require("../datafnprovider");
// function getCompositFunctionDefn() {
//   return final= {
//     "name": "qwert",
//     "description": "qwert",
//     "parameters": ["area","length","breadth"],
//     "returnresult": "",
//     "expression": [
//     {
//       "tag": "Expression::1",
//       "lhs": {
//         "type": "function",
//         "name": "Sum",
//         "varmap": [
//         {
//           "srcvar": "x",
//           "targetvar": "area"
//         },
//         {
//           "srcvar": "y",
//           "targetvar": "area"
//         }
//         ]
//       },
//       "operator": {
//         "type": "operator",
//         "name": "ADD +"
//       },
//       "rhs": {
//         "type": "function",
//         "name": "Subtract",
//         "varmap": [
//         {
//           "srcvar": "x",
//           "targetvar": "length"
//         },
//         {
//           "srcvar": "y",
//           "targetvar": "breadth"
//         }
//         ]
//       },
//       "join_By": {
//         "type": "operator",
//         "name": "ADD +"
//       }
//     },
//     {
//       "tag": "Expression::2",
//       "lhs": {
//         "type": "function",
//         "name": "Multiply",
//         "varmap": [
//         {
//           "srcvar": "x",
//           "targetvar": "length"
//         },
//         {
//           "srcvar": "y",
//           "targetvar": "length"
//         }
//         ]
//       },
//       "operator": {
//         "type": "operator",
//         "name": "SUB -"
//       },
//       "rhs": {
//         "type": "function",
//         "name": "Divide",
//         "varmap": [
//         {
//           "srcvar": "x",
//           "targetvar": "area"
//         },
//         {
//           "srcvar": "y",
//           "targetvar": "area"
//         }
//         ]
//       },
//       "join_By": {
//         "type": "operator",
//         "name": "MUL *"
//       }
//     },
//     {
//       "tag": "Expression::3",
//       "lhs": {
//         "type": "function",
//         "name": "Subtract",
//         "varmap": [
//         {
//           "srcvar": "x",
//           "targetvar": "breadth"
//         },
//         {
//           "srcvar": "y",
//           "targetvar": "breadth"
//         }
//         ]
//       },
//       "operator": {
//         "type": "operator",
//         "name": "MUL *"
//       },
//       "rhs": {
//         "type": "function",
//         "name": "Sum",
//         "varmap": [
//         {
//           "srcvar": "x",
//           "targetvar": "area"
//         },
//         {
//           "srcvar": "y",
//           "targetvar": "length"
//         }
//         ]
//       },
//       "join_By": {
//         "type": "operator",
//         "name": ""
//       }
//     }
//     ]
//   }
// }

return{
  execute : function(fkn, paramObj) {
   var result=[];
   var i=0;
   for(expr in fkn.expression)
   {
    var fnParamData=[];
    var lhs="";
    fnParamData.push(paramObj[fkn.expression[expr].lhs.varmap[0].targetvar]);
    fnParamData.push(paramObj[fkn.expression[expr].lhs.varmap[1].targetvar]);
    var functionModule = new functionProvider(fkn.expression[expr].lhs.name);
    lhs = functionModule.evaluate(fnParamData);
    
    var fnParamData=[];
    fnParamData.push(paramObj[fkn.expression[expr].rhs.varmap[0].targetvar]);
    fnParamData.push(paramObj[fkn.expression[expr].rhs.varmap[1].targetvar]);
    var functionModule = new functionProvider(fkn.expression[expr].rhs.name);
    var rhs = functionModule.evaluate(fnParamData);

    if(fkn.expression[expr].operator.name=="ADD +")
    {
      result[i]= lhs.output+rhs.output;
    }
    if(fkn.expression[expr].operator.name=="SUB -")
    {
      result[i]= lhs.output-rhs.output;
    }
    if(fkn.expression[expr].operator.name=="MUL *")
    {
      result[i]= lhs.output*rhs.output;
    }
    if(fkn.expression[expr].operator.name=="DIV /")
    {
      result[i]= lhs.output/rhs.output;
    } 
    i++;
    result[i]=fkn.expression[expr].join_By.name; 
    i++;
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