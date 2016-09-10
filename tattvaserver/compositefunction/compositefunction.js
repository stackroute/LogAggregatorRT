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
            "targetvar": "length"
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
            "targetvar": "area"
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
            "targetvar": "area"
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
            "targetvar": "area"
          },
          {
            "srcvar": "y",
            "targetvar": "length"
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
        "name": "DIV /"
      }
    }
  ]
}
  }


var execute = function (fkn_name, paramObj) {
  var response = getCompositFunctionDefn(fkn_name);
  var result=[];
  for(i in response.expression)
  {
    console.log(i);
  }
}
  module.exports = {
    execute: execute
  };