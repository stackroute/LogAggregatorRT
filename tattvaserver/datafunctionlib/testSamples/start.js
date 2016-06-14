var fs = require('fs');

//Read Data file
var input = fs.createReadStream('./WDI_Data.csv');
// var input = fs.createReadStream('./simpledata.csv');
var aggregatorpr = require('../aggrprovider');
var accumulator = require("../accumulatorprovider");
var TimeAccumulator = new accumulator("time");
TimeAccumulator.accumulatetill(70);

// var CountAccumulator = new accumulator("count");
// CountAccumulator.accumulatetill(10);
readLines(input);
//Function for sending streaming data as input
function readLines(input) {
    var remaining = '';

    input.on('data', function(data) {
        remaining += data;
        var index = remaining.indexOf('\n');
        var last = 0;
        while (index > -1) {
            var line = remaining.substring(last, index);
            last = index + 1;
            var isFull = TimeAccumulator.accumulatefullcheck(line);
            if (isFull) {
                console.log('active now');
                var clfn = new aggregatorpr('count');
                var result = clfn.evaluate(isFull);
                console.log("accumulate by time", result);
            }

            // var isFull = CountAccumulator.accumulatefullcheck(line);
            // if(isFull!=undefined)
            // {
            //   console.log(isFull);
            //  console.log('active now');
            //  var clfn=new aggregatorpr('count');
            //  var result=clfn.evaluate(isFull);
            //  console.log(result);
            //
            //
            // }
            index = remaining.indexOf('\n', last);
        }
        remaining = remaining.substring(last);
    });
    input.on('end', function() {

    });
}
