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
    var watchtask = req.body;

    if (watchtask === undefined) {
        res.status(400).json({
            error: "Invalid request, one or more required request data not found..!"
        });
    }

    var processor = new taskProcessor();
    var result = processor.processNewTask(watchtask);

    return res.json(result);
});

module.exports = router;