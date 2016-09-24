var prevExprResultMapper = {

  map: function(fieldConfig, execObj, dataObj) {
    var prevExprResult = execObj.path[fieldConfig['exprtag']]['result'];
    return prevExprResult;

  }
}

module.exports = prevExprResultMapper;
