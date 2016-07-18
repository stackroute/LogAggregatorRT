var log4js = require('log4js');
var path = require('path');

log4js.configure (path.join(__dirname, './log4js.conf.json'), {
    cwd:path.join(__dirname, './logs/')
});

var logger = log4js.getLogger();

module.exports = logger;
