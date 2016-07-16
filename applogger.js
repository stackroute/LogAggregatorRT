var log4js = require('log4js');
var path = require('path');

//Log4js is taking relative path of the file, hence better to fix the path in the config
log4js.configure(path.join(__dirname, 'log4js.conf.json'), {
    cwd: path.join(__dirname, 'logs/')
});

var logger = log4js.getLogger();

module.exports = logger;
