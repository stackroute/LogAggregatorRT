var fs = require("fs");
var highland = require('highland');
var websocket = require('websocket-stream');
var wlstDef = getWatchList();
var dataSource = {
    ipaddr: '172.23.238.253',
    port: '7070'
};
var srcstream= websocket('ws://' + dataSource.ipaddr + ':' + dataSource.port);

var exprPipeline = getExpressionPipeLine(wlstDef);
var publisherPipeline = getPublisherPipeline(wlstDef);

// var srcstream = fs.createReadStream('./logdata2.json', 'utf-8');

highland(srcstream)
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
            } else {
                logLineObj['lhs'] = undefined;
                //console.log("lfield: ", expr.watch.lfield);
            }

            //console.log("LHS: ", logLineObj['lhs']);

            return logLineObj;
        }));

        myProcessors.push(highland.map(function(logLineObj) {

            ////console.log("in RHS processor: ", logLineObj);

            if (expr.watch.rfield.fieldType == "inputvalue") {
                logLineObj['rhs'] = expr.watch.rfield.inputvalue;
            } else {
                logLineObj['rhs'] = undefined;
                //console.log("rfield: ", expr.watch.rfield);
            }

            //console.log("RHS: ", logLineObj['rhs']);

            return logLineObj;
        }));

        myProcessors.push(highland.map(function(logLineObj) {
            logLineObj['oprtr'] = expr.watch.operator;

            //console.log("OPRTR: ", logLineObj['oprtr']);

            return logLineObj;
        }));

        myProcessors.push(highland.map(function(logLineObj) {
            logLineObj['expr_result'] = undefined;

            var oprtr = logLineObj['oprtr'];
            var rhs = logLineObj['rhs'];
            var lhs = logLineObj['lhs'];
            if (rhs !== undefined && lhs !== undefined && oprtr !== undefined) {
                if (oprtr == '>') {
                    logLineObj['expr_result'] = (lhs > rhs);
                }
            }

            //console.log("EXPR RESULT: ", logLineObj['expr_result']);

            return logLineObj;
        }));
    });

    return highland.pipeline.apply(null, myProcessors);
}

function getPublisherPipeline(wlstDef) {
    var myProcessors = [];

    myProcessors.push(highland.map(function(logLineObj) {
        if (logLineObj['expr_result'] !== undefined) {
            //console.log("Result: ", logLineObj['expr_result']);
        } else {
            //console.log("Result: FAILED");
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
             "fieldType": "DataFields",
             "DataField": "noOfFiles",
             "exprAsText": "DataField(noOfFiles)"
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



































// var fs=require('fs');
// var _ = require('highland');
// // var bodyParser = require('body-parser');
// // var parseJSON=bodyParser.json();
// var output=fs.createWriteStream('../execute/output.json');
// var docs=fs.createReadStream('../execute/dummy.json');
// var output2=fs.createWriteStream('../execute/output2.json')
//
//
// // _(docs).map(function(data)
// // {
// // return JSON.stringify(data.toString());
// // }).pipe(process.stdout);
// //
// // _([{id:'1',name:'surya',op:'+',num1:'2',num2:'3'},{id:'1',name:'surya',op:'-',num1:'2',num2:'3'}]).map(function(data){
// // return ""+data.op+"";
// // }).map(function(data){
// // if(data=='+')
// // {
// // return ""+5+"";
// // }
// // else{
// // return ""+8+"";
// // }
// // }).pipe(process.stdout);
// //
// // var watchpipeline=_.pipeline(
// // _.map(function(data){
// // var names=JSON.stringify;
// // return data;
// // }),
// // _.map(function(data){
// // return data;
// // })
// // );
// // _(docs).pipe(watchpipeline).pipe(process.stdout);
//
//
// // var fiterpipelineExample=_.pipe()
//
//
//
//
//
// // var through = _.pipeline(
// //     _.map(parseJSON),
// //     _.reduce(collectCategories)
// // );
// // function collectCategories(data){
// // //console.log("hi")
// // }
// //     // _.filter(isBlogpost),
// //     // _.through(output)
// // docs.pipe(output);
//
// // var doubled = _([1, 2, 3, 4]).map(function (x) {
// //   return (""+x+"");
// // }).pipe(process.stdout);
// //
// // for( i in doubled)
// // {
// // //console.log(doubled[i]);
// // }
//
//
// // //console.log(doubled);
// //
// // var through2 = _.pipeline(function (s) {
// //     return s.map(parseJSON).filter(isBlogpost); // etc.
// // });
// //
//
//
// //success async nfcall([]).parellel
// // _([
// // function a(){
// // //console.log("hi");
// // },  function b(){
// // //console.log("hello");
// //   }
// // ]).nfcall([]).parallel(2).toArray(function (xs) {
// //   //console.log(xs.length);
// // })
//
// //success  pipes to a output stream
// // docs.pipe(output);
//
// //try one success fibonacci take give no of o/p value,push pushes next to run for next time
//
// // var fibGenerator = function() {
// //     var a = 0, b = 1;
// //     return function(push, next) {
// //         push(null, b);
// //         b = b+a; a = b-a;
// //         next();
// //     };
// // }();
// // _(fibGenerator).take(20).each(//console.log.bind(console));
//
//
// //failure
// // var through=_.pipeline(_.filter(isBlogpost));
//
// // var isBlogpost=function()
// // {
// // //console.log("hi");
// // }
