var fs = require('fs');
var highland = require('highland');
var websocket = require('websocket-stream');
var dataSource = {
    ipaddr: '172.23.238.253',
    port: '7070'
};
var wlstDef = require('./wlstdef.json');

var exprPipeline = getExpressionPipeLine(wlstDef);
var publisherPipeline = getPublisherPipeline(wlstDef);

var wsstream = websocket('ws://' + dataSource.ipaddr + ':' + dataSource.port);
//var srcstream = fs.createReadStream('./logdata2.json', 'utf-8');
var srcstream = fs.createReadStream('./gitlogs.json', 'utf-8');

var wsltresult = fs.createWriteStream('./wsltresult.json');

//highland(wsstream)
highland(srcstream)
    .map(function(data) {
        console.log('inspecting data');

        if (Array.isArray(data)) {
            console.log('***** Data is ARRAY');
            for (i = 0; i < data.length; i++) {
                if ((typeof data[i]) === 'object') {
                    console.log('***** Returning object');
                    return data[i];
                }
            }
        }

        if ((typeof data) === 'string') {
            console.log('***** Data is string');
            data = JSON.parse(data);
        } else if ((typeof data) === 'object') {
            console.log('***** Data is object');
            return data;
        } else {
            throw "Invalid data for processing...!";
            //return {};
        }
    }).map(function(data) {
        console.log(data.noOfFiles);
        return data;
    })
//.pipe(exprPipeline)
//.pipe(publisherPipeline)
//.end();
// .map(function(data) {
//     return JSON.stringify(data);
// })
.pipe(process.stdout);


function getExpressionPipeLine(wlstDef) {
    var myProcessors = [];

    wlstDef.expressions.forEach(function(expr) {

        myProcessors.push(highland.map(function(logLineObj) {
            console.log("lfield: ", expr.watch.lfield);
            if (expr.watch.lfield.fieldType == "DataFields") {
                logLineObj['lhs'] = logLineObj[expr.watch.lfield.DataField];
            } else {
                logLineObj['lhs'] = undefined;
            }

            console.log("LHS: ", logLineObj['lhs']);

            return logLineObj;
        }));

        myProcessors.push(highland.map(function(logLineObj) {
            console.log("rfield: ", expr.watch.rfield);
            if (expr.watch.rfield.fieldType == "inputvalue") {
                logLineObj['rhs'] = logLineObj[expr.watch.rfield.inputvalue];
            } else {
                logLineObj['rhs'] = undefined;
            }

            console.log("RHS: ", logLineObj['rhs']);

            return logLineObj;
        }));

        myProcessors.push(highland.map(function(logLineObj) {
            console.log("operator: ", expr.watch.operator);
            console.log("oprtr: ", expr);

            logLineObj['oprtr'] = logLineObj[expr.watch.operator];

            console.log("OPRTR: ", logLineObj['oprtr']);

            return logLineObj;
        }));

        myProcessors.push(highland.map(function(logLineObj) {
            logLineObj['expr_result'] = undefined;

            var oprtr = logLineObj['oprtr'];
            var rhs = logLineObj['rhs'];
            var lhs = logLineObj['lhs'];
            if (rhs !== undefined && lhs !== undefined) {
                if (oprtr == '>') {
                    logLineObj['expr_result'] = (lhs > rhs);
                }
            }

            console.log("EXPR RESULT: ", logLineObj['expr_result']);

            return logLineObj;
        }));
    });

    return highland.pipeline.apply(null, myProcessors);
}
