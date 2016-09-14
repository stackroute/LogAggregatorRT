var functionProvider = require("../datafunctionlib/datafnprovider");

/*
var execute = function (fkn_name, paramObj) {
  var response = getCompositFunctionDefn(fkn_name);
  var result=[];
  for(var i=0,j=0;i<3;i++) {
    // console.log(response[0].expression[i].type);
    if(response[0].expression[i].type=="function") {

      var fnParamData=[];
      fnParamData.push(paramObj[response[0].expression[i].varmap[0].targetvar]);
      fnParamData.push(paramObj[response[0].expression[i].varmap[1].targetvar]);
      var functionModule = new functionProvider(response[0].expression[i].name);
      result[j] = functionModule.evaluate(fnParamData);
      j++;
    }
  }
  var final;
  if(response[0].expression[1].name.toUpperCase()=="ADD +")
  {
    final= result[0].output+result[1].output;
  }
  if(response[0].expression[1].name.toUpperCase()=="SUB -")
  {
    final= result[0].output-result[1].output;
  }
  if(response[0].expression[1].name.toUpperCase()=="MUL *")
  {
    final= result[0].output*result[1].output;
  }
  if(response[0].expression[1].name.toUpperCase()=="DIV /")
  {
    final= result[0].output/result[1].output;
  }  
  return final;
}*/

function getCompositFunctionDefn() {
  return final= {
    "name": "qwert",
    "description": "qwert",
    "parameters": ["area","length","breadth"],
    "returnresult": "",
    "expression": [
    {
      "tag": "Expression::1",
      "lhs": {
        "type": "function",
        "name": "Sum",
        "varmap": [
        {
          "srcvar": "x",
          "targetvar": "area"
        },
        {
          "srcvar": "y",
          "targetvar": "area"
        }
        ]
      },
      "operator": {
        "type": "operator",
        "name": "ADD +"
      },
      "rhs": {
        "type": "function",
        "name": "Subtract",
        "varmap": [
        {
          "srcvar": "x",
          "targetvar": "length"
        },
        {
          "srcvar": "y",
          "targetvar": "breadth"
        }
        ]
      },
      "join_By": {
        "type": "operator",
        "name": "ADD +"
      }
    },
    {
      "tag": "Expression::2",
      "lhs": {
        "type": "function",
        "name": "Multiply",
        "varmap": [
        {
          "srcvar": "x",
          "targetvar": "length"
        },
        {
          "srcvar": "y",
          "targetvar": "length"
        }
        ]
      },
      "operator": {
        "type": "operator",
        "name": "SUB -"
      },
      "rhs": {
        "type": "function",
        "name": "Divide",
        "varmap": [
        {
          "srcvar": "x",
          "targetvar": "area"
        },
        {
          "srcvar": "y",
          "targetvar": "area"
        }
        ]
      },
      "join_By": {
        "type": "operator",
        "name": "MUL *"
      }
    },
    {
      "tag": "Expression::3",
      "lhs": {
        "type": "function",
        "name": "Subtract",
        "varmap": [
        {
          "srcvar": "x",
          "targetvar": "breadth"
        },
        {
          "srcvar": "y",
          "targetvar": "breadth"
        }
        ]
      },
      "operator": {
        "type": "operator",
        "name": "MUL *"
      },
      "rhs": {
        "type": "function",
        "name": "Sum",
        "varmap": [
        {
          "srcvar": "x",
          "targetvar": "area"
        },
        {
          "srcvar": "y",
          "targetvar": "length"
        }
        ]
      },
      "join_By": {
        "type": "operator",
        "name": ""
      }
    }
    ]
  }
}


var execute = function (fkn_name, paramObj) {
  var response = getCompositFunctionDefn(fkn_name);
  var result=[];
  var i=0;

  for(expr in response.expression)
  {
 
    var fnParamData=[];
    var lhs="";
    fnParamData.push(paramObj[response.expression[expr].lhs.varmap[0].targetvar]);
    fnParamData.push(paramObj[response.expression[expr].lhs.varmap[1].targetvar]);
    var functionModule = new functionProvider(response.expression[expr].lhs.name);
   lhs = functionModule.evaluate(fnParamData);
    
    var fnParamData=[];
    fnParamData.push(paramObj[response.expression[expr].rhs.varmap[0].targetvar]);
    fnParamData.push(paramObj[response.expression[expr].rhs.varmap[1].targetvar]);
    var functionModule = new functionProvider(response.expression[expr].rhs.name);
    var rhs = functionModule.evaluate(fnParamData);
    
    if(response.expression[expr].operator.name=="ADD +")
    {
      result[i]= lhs.output+rhs.output;
    }
    if(response.expression[expr].operator.name=="SUB -")
    {
      result[i]= lhs.output-rhs.output;
    }
    if(response.expression[expr].operator.name=="MUL *")
    {
      result[i]= lhs.output*rhs.output;
    }
    if(response.expression[expr].operator.name=="DIV /")
    {
      result[i]= lhs.output/rhs.output;
    } 
    i++;
    result[i]=response.expression[expr].join_By.name; 
    i++;
  }
  console.log(result[4]);
  var final;
  for(var j=1;j<result.length;j=j+2)
  {
    if(result[j]=="ADD +")
    {
      console.log(result[j-1]);
      console.log(result[j+1]);
      console.log(result[j]);
      result[j+1]=result[j-1]+result[j+1];
      final=result[j+1];
      console.log(final);
    }
    if(result[j]=="SUB -")
    {
       result[j+1]=result[j-1]-result[j+1];
       final=result[j+1];
    }
    if(result[j]=="MUL *")
    {
      console.log(result[j-1]);
      console.log(result[j+1]);
      console.log(result[j]);
       result[j+1]=result[j-1]*result[j+1];
       final=result[j+1];
    }
    if(result[j]=="DIV /")
    {

       result[j+1]=result[j-1]/result[j+1];
       final=result[j+1];
    } 
  }
  console.log('kritika'+final);
  return final;
}
module.exports = {
  execute: execute
};