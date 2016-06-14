module.exports = function() {
    this.windowDuration;
    this.t0;
    this.currentTime;
    return {
        accumulatetill: function(time) {
            this.windowDuration = time;
        },

        accumulatefullcheck: function(line) {

            //creating array if it doesn't exist
            if (typeof lineArr == "undefined" || !(lineArr instanceof Array)) {
                lineArr = [];
            }

            //accumulating data for 10secs
            if (typeof line !== 'undefined') {
                var obj = {};
                //  obj.line = line.trim();
                obj.date = new Date();
                obj.line = line;
                lineArr.push(obj);
            }

            if (lineArr.length == 1) {
                t0 = new Date();
            }

            //Get current time
            currentTime = new Date();
            var diffMs = (currentTime.getTime() - t0.getTime());
            console.log("Time diff: " + diffMs);
            if (diffMs < parseInt(this.windowDuration)) {
                //window not yet active
                console.log('not yet active');
                return false;
            } else if (diffMs >= parseInt(this.windowDuration)) {
                //window active now
                pastDate = new Date();
                pastDate.setSeconds(pastDate.getSeconds() - this.windowDuration);
                dataArr = [];
                for (var counter = lineArr.length - 1; counter >= 0; counter--) {
                    var itemdate;
                    itemdate = lineArr[counter].date;
                    if (Date.parse(itemdate) >= Date.parse(pastDate)) {
                        if (lineArr[counter].line !== "") {
                            dataArr.push((lineArr[counter].line));
                        }
                    } else {
                        console.log('loop3--------------' + counter);
                        lineArr.splice(0, counter + 1);
                        break;
                    }
                }
                return dataArr;
            }
        }
    }
};
