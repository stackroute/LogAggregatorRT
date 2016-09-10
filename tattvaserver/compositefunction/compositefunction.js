var functionProvider = require("../datafunctionlib/datafnprovider");


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
  if(response[0].expression[1].name.toUpperCase()=="ADD")
  {
    final= result[0].output+result[1].output;
  }
  if(response[0].expression[1].name.toUpperCase()=="SUB")
  {
    final= result[0].output-result[1].output;
  }
  if(response[0].expression[1].name.toUpperCase()=="MUL")
  {
    final= result[0].output*result[1].output;
  }
  if(response[0].expression[1].name.toUpperCase()=="DIV")
  {
    final= result[0].output/result[1].output;
  }  
  return final;
}

function getCompositFunctionDefn() {
  return final= [
    {
      "name": "function",
      "description": "function",
      "parameters": [
      {
        "id": "parameter1",
        "$$hashKey": "object:113",
        "name": "area"
      },
      {
        "id": "parameter2",
        "$$hashKey": "object:267",
        "name": "length"
      }
      ],
      "final=result": "",
      "expression": [
      {
        "type": "function",
        "tag": "tag::1",
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
      {
        "type": "operator",
        "tag": "tag::2",
        "name": "DIV"
      },
      {
        "type": "function",
        "tag": "tag::3",
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
      }
      ],
    }
    ];
  }

  module.exports = {
    execute: execute
  };