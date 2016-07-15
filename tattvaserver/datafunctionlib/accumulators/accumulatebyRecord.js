function RecordAccumulator () {
  var recordBucket = [];

  var slideCount = undefined;

  this.accumulateTill = function(count) {
    if(!count) {
      throw new Error("Invalid arguments passed for accumulation");
    }

    slideCount = count;

    return;
  };

  this.collectData = function(usrRecord) {
    var result = undefined;

    if(usrRecord === null || usrRecord === undefined) {
      return false;
    }

    pushToBucket(usrRecord)

    if( recordBucket.length == slideCount) {
      //Accumulation is now reached
      var dataBucket = recordBucket.slice();

      //This removes one record, i.e., 0th record
      recordBucket.shift();

      return dataBucket;
    }
    return false;
  };

  function pushToBucket (usrRecord) {
    recordBucket.push(usrRecord);
    return;
  }

}
module.exports = RecordAccumulator;
