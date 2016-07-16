
var datafield = {

  map: function(fieldConfig, dataObj) {
    var result = undefined;
    var logfield = fieldConfig['DataField'];

    result = dataObj[logfield];
      // console.log(result);
    return result;
  }
}

module.exports = datafield;
