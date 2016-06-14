var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;

var highland = require('highland');
var websocket = require('websocket-stream');
var dataSource = {
  ipaddr: '172.23.238.253',
  port: '7070'
};

// var wlstDef = require('./wlstdef.json');
var wlstDef = require('./wlstdefn_w01.json');
// var wlstDef = getWatchListFromDB();
var exprPipeline = getExpressionPipeLine(wlstDef);
var exprReductionPipeline = getExpressionReducePipeline(wlstDef);
var publisherPipeline = getPublisherPipeline(wlstDef);
var wsstream = websocket('ws://' + dataSource.ipaddr + ':' + dataSource.port);
// var srcstream = fs.createReadStream('./logdata2.json', 'utf-8');
var outtream = fs.createWriteStream('./watchloop.log', 'utf-8');

setImmediate(function(){
  highland(wsstream)
  .pipe(exprPipeline)
  .pipe(exprReductionPipeline)
  .pipe(publisherPipeline);
});
console.log("Loop started..!");

function getExpressionPipeLine(wlstDef) {
  var myProcessors = [];

  //Once per each record
  myProcessors.push(highland.map(function(data) {
    data = JSON.parse(data);
    var execObj={"path":{}, "data":data[2]};
    // console.log("Leaving initial processor: ", execObj);
    return execObj;
  }));

  wlstDef.expressions.forEach(function(expr) {
    //LHS
    myProcessors.push(highland.map(function(execObj) {
      // console.log("Exec obj: ", execObj);
      // console.log("Exec Path obj: ", execObj.path);

      execObj.path[expr.tag] = {};

      if (expr.watch.lfield.fieldType == "DataFields") {
        execObj.path[expr.tag]['lhs'] = execObj.data[expr.watch.lfield.DataField];
      }
      else if (expr.watch.lfield.fieldType == "inputvalue") {
        execObj.path[expr.tag]['lhs'] = expr.watch.lfield.inputvalue;
      }
      else if (expr.watch.lfield.fieldType=="constant") {
        var constant=expr.watch.lfield.Constants;
        var result = undefined;

        if(constant=="Archimedes' constant π") {
          result =3.14;
        } else if (constant=="Euler's number e") {
          result =2.74;
        } else if (constant=='Ramanujan constant K') {
          result =0.764;
        } else if (constant=='Omega Constant Ω') {
          result =0.56714;
        } else if (constant=='The golden ratio φ') {
          result =1.618;
        }

        execObj.path[expr.tag]['lhs'] = result;
      }
      else if (expr.watch.lfield.fieldType=="Function") {
        var function_name=expr.watch.lfield.function;
        var result = undefined;

        if(function_name=="Sum")
        {
          result=0;
          for(i in expr.watch.lfield.functionparam)
          {
            // console.log(expr.watch.lfield.functionparam[i]);
            result= execObj.data[expr.watch.lfield.functionparam[i]]+result;
          }
        }

        if(function_name=="Multiply")
        {
          result=1;
          for(i in expr.watch.lfield.functionparam)
          {
            // console.log(expr.watch.lfield.functionparam[i]);
            result = execObj.data[expr.watch.lfield.functionparam[i]]+result;
          }
        }

        if(function_name=="Subtract")
        {
          result=0;
          for(i in expr.watch.lfield.functionparam)
          {
            console.log(expr.watch.lfield.functionparam[i]);
            result = execObj.data[expr.watch.lfield.functionparam[i]]-result;
          }
        }

        if(function_name=="Divide")
        {
          result=1;
          for(i in expr.watch.lfield.functionparam)
          {
            result = execObj.data[expr.watch.lfield.functionparam[i]]/result;
          }
        }
        execObj.path[expr.tag]['lhs'] = result;
      }  else {
        execObj.path[expr.tag]['lhs']  = undefined;
      }
      // console.log("Leaving LHS procesor: ", execObj.path[expr.tag]);
      return execObj;
    }));//end of left hand side field

    //RHS start of right hand side field
    myProcessors.push(highland.map(function(execObj) {

      // console.log("Entered RHS processor: ", execObj.path[expr.tag]);

      if (expr.watch.rfield.fieldType == "DataFields") {
        execObj.path[expr.tag]['rhs'] = execObj.data[expr.watch.rfield.DataField];
      }
      else if (expr.watch.rfield.fieldType == "inputvalue") {
        execObj.path[expr.tag]['rhs'] = expr.watch.rfield.inputvalue;
      }
      else if (expr.watch.rfield.fieldType=="constant") {
        var constant=expr.watch.rfield.Constants;
        var result = undefined;
        if(constant=="Archimedes' constant π") {
          result =3.14;
        } else if (constant=="Euler's number e") {
          result =2.74;
        } else if (constant=='Ramanujan constant K') {
          result =0.764;
        } else if (constant=='Omega Constant Ω') {
          result =0.56714;
        } else if (constant=='The golden ratio φ') {
          result =1.618;
        }
        execObj.path[expr.tag]['rhs'] = result;
      }
      else if (expr.watch.rfield.fieldType=="Function") {
        var function_name=expr.watch.rfield.function;
        var result = undefined;

        if(function_name=="Sum")
        {
          result=0;
          for(i in expr.watch.rfield.functionparam)
          {
            // console.log(expr.watch.rfield.functionparam[i]);
            result= execObj.data[expr.watch.rfield.functionparam[i]]+result;
          }
        }

        if(function_name=="Multiply")
        {
          result=1;
          for(i in expr.watch.rfield.functionparam)
          {
            // console.log(expr.watch.rfield.functionparam[i]);
            result = execObj.data[expr.watch.rfield.functionparam[i]]+result;
          }
        }

        if(function_name=="Subtract")
        {
          result=0;
          for(i in expr.watch.rfield.functionparam)
          {
            result = execObj.data[expr.watch.rfield.functionparam[i]]-result;
          }
        }

        if(function_name=="Divide")
        {
          result=1;
          for(i in expr.watch.rfield.functionparam)
          {
            result = execObj.data[expr.watch.rfield.functionparam[i]]/result;
          }
        }
        execObj.path[expr.tag]['rhs'] = result;
      }  else {
        execObj.path[expr.tag]['rhs'] = undefined;
      }
      // console.log("Leaving RHS Processor: ", execObj.path[expr.tag]);
      return execObj;
    })); //End of RHS processor

    //Operator
    myProcessors.push(highland.map(function(execObj) {
      execObj.path[expr.tag]['oprtr'] = expr.watch.operator;
      return execObj;
    })); //end of operator

    //Expression Result evaluator
    myProcessors.push(highland.map(function(execObj) {
      // console.log("On entering Expr result evaluator: ", execObj.path[expr.tag]);
      execObj.path[expr.tag]['result'] = undefined;

      var oprtr = execObj.path[expr.tag]['oprtr'];
      var rhs = execObj.path[expr.tag]['rhs'];
      var lhs = execObj.path[expr.tag]['lhs'];

      var result = undefined;
      if (rhs !== undefined && lhs !== undefined && oprtr !== undefined) {
        if (oprtr=='+') {
          result = (lhs + rhs);
        }
        else if (oprtr=='-') {
          result = (lhs - rhs);
        }
        else if (oprtr=='/') {
          result = (lhs / rhs);
        }
        else if (oprtr=='*') {
          result = (lhs * rhs);
        }
        else if (oprtr=='%') {
          result = (lhs % rhs);
        }
        else if (oprtr=='==') {
          result = (lhs == rhs);
        }
        else if (oprtr=='!=') {
          result = (lhs != rhs);
        }
        else if (oprtr=='>=') {
          result = (lhs >= rhs);
        }
        else if (oprtr=='<=') {
          result = (lhs <= rhs);
        }
        else if (oprtr == '>') {
          result = (lhs > rhs);
        }else if (oprtr == '<') {
          result = (lhs < rhs);
        }
        execObj.path[expr.tag]['result'] = result;
      }

      //console.log("EXPR ", expr.tag, " RESULT: ", execObj.path[expr.tag]['result']);

      return execObj;
    }));
  });

  return highland.pipeline.apply(null, myProcessors);
}//end of exprPipeline

function getExpressionReducePipeline(wlstDef) {
  var myProcessors = [];
  myProcessors.push(highland.map(function(execObj) {
    var watchListResult = true;

    for (expr in execObj.path) {
      //We can do AND or OR with previous expr result
      watchListResult = ((execObj.path[expr].result) && watchListResult);
    }

    execObj.path["watchresult"] = watchListResult;

    return execObj;
  }));

  return highland.pipeline.apply(null, myProcessors);
}

function getPublisherPipeline(wlstDef) {
  var myProcessors = [];

  myProcessors.push(highland.each(function(execObj) {
    // console.log("====================================================================");
    // console.log("F1:", execObj.data.noOfFiles, "\nF2:", execObj.data.insertion);
    // console.log(execObj);
    //return execObj;
    outtream.write("\n====================================================================")
    outtream.write("\nnoOfFiles:" + execObj.data.noOfFiles + " | insertion:" + execObj.data.insertion);
    outtream.write("\n" + JSON.stringify(execObj.path, null, true));
  }));

  return highland.pipeline.apply(null, myProcessors);
}

function getWatchListFromDB() {
  // console.log("Fetching watch list");
  var url = 'mongodb://127.0.0.1:27017/wipro';
  var wlstdef = undefined;
  MongoClient.connectS(url, function(err, db) {
    assert.equal(null, err);
    // console.log("Connected to DB");
    var cursor = db.collection('watchlists').find({name:'W01'});
    cursor.each(function(err, doc) {
      //assert.equal(err, null);
      if (doc != null) {
        // console.log("Got Watch list ", doc);
        wlstdef = doc;
        db.close();
        return;
      } else {
        console.log("Err ", err);
        db.close();
      }
    });
    assert.equal(wlstdef, null, "Watch list not found");
    return wlstdef;
  });
}
