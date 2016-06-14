var fs = require("fs");
var highland = require('highland');
var websocket = require('websocket-stream');
var wlstDef = getWatchList();
var dataSource = {
    ipaddr: '172.23.238.253',
    port: '7070'
};
var exprPipeline = getExpressionPipeLine(wlstDef);
var publisherPipeline = getPublisherPipeline(wlstDef);
var wsstream = websocket('ws://' + dataSource.ipaddr + ':' + dataSource.port);
// var srcstream = fs.createReadStream('./logdata2.json', 'utf-8');

highland(wsstream )
    .map(function(data) {
        data = JSON.parse(data);
        return data[2];
    })
    .pipe(exprPipeline)
    .pipe(publisherPipeline)
    .map(function(data) {
        //return JSON.stringify(data);
        return "\n===> " + JSON.stringify(data) + "\n";
    })
    .pipe(process.stdout);

function getExpressionPipeLine(wlstDef) {
    var myProcessors = [];

    wlstDef.expressions.forEach(function(expr) {

        myProcessors.push(highland.map(function(logLineObj) {
            if (expr.watch.lfield.fieldType == "DataFields") {
                logLineObj['lhs'] = logLineObj[expr.watch.lfield.DataField];
            }
            else if (expr.watch.lfield.fieldType == "Function") {
                var func=expr.watch.lfield.function;
                console.log(func);
                    for(i in expr.watch.lfield.functionparam)
                    {
                      if(func=="Subtract")
                    {

                    }
                  }
                // for(i in expr.watch.lfield.functionparam)
                // {
                //     functionparam.push(expr.watch.lfield.functionparam[i]);
                // }
                // logLineObj['functionparam'] = functionparam.slice();
            }else {
                logLineObj['lhs'] = undefined;
                console.log("lfield: ", expr.watch.lfield);
            }
            console.log("LHS: ", logLineObj['lhs']);
            return logLineObj;
        }));



        myProcessors.push(highland.map(function(logLineObj) {
            if (expr.watch.rfield.fieldType == "inputvalue") {
                logLineObj['rhs'] = expr.watch.rfield.inputvalue;
            }else if (expr.watch.rfield.fieldType=="Constants") {
              logLineObj['rhs'] = expr.watch.rfield.Constants;
            } else {
                logLineObj['rhs'] = undefined;
                console.log("rfield: ", expr.watch.rfield);
            }

            console.log("RHS: ", logLineObj['rhs']);

            return logLineObj;
        }));

        myProcessors.push(highland.map(function(logLineObj) {
            logLineObj['oprtr'] = expr.watch.operator;

            console.log("OPRTR: ", logLineObj['oprtr']);

            return logLineObj;
        }));

        myProcessors.push(highland.map(function(logLineObj) {
            logLineObj['expr_result'] = undefined;

            var oprtr = logLineObj['oprtr'];
            var rhs = logLineObj['rhs'];
            var lhs = logLineObj['lhs'];

// checking for operators here

            if (rhs !== undefined && lhs !== undefined && oprtr !== undefined) {
              if (oprtr=='+') {
                          logLineObj['expr_result'] = (lhs + rhs);
                }
                else if (oprtr=='-') {
                          logLineObj['expr_result'] = (lhs - rhs);
                }
                else if (oprtr=='/') {
                          logLineObj['expr_result'] = (lhs / rhs);
                }
                else if (oprtr=='*') {
                          logLineObj['expr_result'] = (lhs * rhs);
                }
                else if (oprtr=='%') {
                          logLineObj['expr_result'] = (lhs % rhs);
                }
                else if (oprtr=='==') {
                          logLineObj['expr_result'] = (lhs == rhs);
                }
                else if (oprtr=='!=') {
                          logLineObj['expr_result'] = (lhs != rhs);
                }
                  else if (oprtr=='>=') {
                          logLineObj['expr_result'] = (lhs >= rhs);
                }
                else if (oprtr=='<=') {
                          logLineObj['expr_result'] = (lhs <= rhs);
                }
                else if (oprtr == '>') {
                    logLineObj['expr_result'] = (lhs > rhs);
                }else if (oprtr == '<') {
                    logLineObj['expr_result'] = (lhs < rhs);
                }
            }
            console.log("EXPR RESULT: ", logLineObj['expr_result']);

            return logLineObj;
        }));
    });

    return highland.pipeline.apply(null, myProcessors);
}
function getPublisherPipeline(wlstDef) {
    var myProcessors = [];

    myProcessors.push(highland.map(function(logLineObj) {
        if (logLineObj['expr_result'] !== undefined) {
            console.log("Result: ", logLineObj['expr_result']);
        } else {
            console.log("Result: FAILED");
        }

        return logLineObj;
    }));
    return highland.pipeline.apply(null, myProcessors);
   }


   function getWatchList() {
       return {
    "namespace": "Git Commit Log",
    "stream": "Git Log Stream",
    "expressions": [{
        "tag": "tag::1",
        "joinWith": "",
        "joinBy": "",
        "inputStream": "",
        "watch": {
            "lfield": {
                "fieldType": "Function",
                "function": "Subtract",
                "functionparam": [
                  "noOfFiles",
                  "noOfFiles"
                ],
                "exprAsText": "Subtract(noOfFiles,noOfFiles)"
            },
            "rfield": {
                "fieldType": "inputvalue",
                "inputvalue": "5",
                "exprAsText": "5"
            },
            "operator": ">"
        },
        "labelData": true,
        "outcomeForwarding": "All Data"
    }, {
        "tag": "tag::2",
        "joinWith": "",
        "joinBy": "",
        "inputStream": "",
        "watch": {
            "lfield": {
                "fieldType": "DataFields",
                "DataField": "noOfFiles",
                "exprAsText": "DataField(noOfFiles)"
            },
            "rfield": {
                "fieldType": "inputvalue",
                "inputvalue": "10",
                "exprAsText": "10"
            },
            "operator": "<="
        },
        "labelData": true,
        "outcomeForwarding": "All Data"
    }],
    "publisher": [{
        "publishType": "publishToDashboard",
        "graphTypes": "line",
        "tabsType": [
            "Graph",
            "LogDataViewer",
            "ExecutionFlow"
        ],
        "widgetSizes": "50",
        "logDataDisplayType": "table"
    }],
    "name": "Git Log Watch",
    "description": "Watch Git Commit Log for meaningful data"
}
}
