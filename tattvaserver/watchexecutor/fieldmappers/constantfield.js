
var constfield = {
  ConstNameValueMap: {
    "Archimedes' constant π" : 3.14,
    "Euler's number e" : 2.74,
    "Ramanujan constant K":0.764,
    "Omega Constant Ω":0.56714,
    "The golden ratio φ":1.1618
  },

  map: function(fieldConfig, dataObj) {
    var constName = fieldConfig['Constants'];
    var result = undefined;

    if(constName !== undefined) {
      result = this.ConstNameValueMap[constName];
    }

    return result;
  }
}

module.exports = constfield;
