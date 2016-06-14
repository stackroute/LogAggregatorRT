module.exports = function() {
    this.count;
    var aggregatorpr = require('../aggrprovider');
    var counter = 0;
    return {
        accumulatetill: function(count) {
            arr = new Array(count);
        },

        accumulatefullcheck: function(line) {
            if (counter < count - 1) {
                arr[counter] = line;

                counter++;
                return undefined;
            } else {
                var k = counter % count;
                arr[k] = line;
                counter++;
                return arr;
            }
        }
    }
};
