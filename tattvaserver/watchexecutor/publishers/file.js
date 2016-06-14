var fs=require('fs');
var filepublisher = {
  var outtream = fs.createWriteStream('file', 'utf-8');
  consume: function(file, execObj) {
    outtream.write("\n====================================================================")
    outtream.write("\n" + JSON.stringify(execObj.path, null, true));
  }
}

module.exports = filepublisher;
