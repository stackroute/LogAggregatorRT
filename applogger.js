var log4js = require('log4js');

log4js.configure('./log4js.conf.json', {
    cwd: './logs/'
});

var logger = log4js.getLogger();

module.exports = logger;