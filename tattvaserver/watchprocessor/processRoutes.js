var router = require('express').Router();

var processCtrlr = require('./processController');
var taskProcessor = require('./taskProcessor');

/**
 * Pulse check
 */
router.get('/echo', function(req, res) {
    return res.send("charlie");
});

/**
 * Process a new Task
 */
router.post('/watchtask', function(req, res) {
    var task = req.body;
    res.json({});
});

module.exports = router;