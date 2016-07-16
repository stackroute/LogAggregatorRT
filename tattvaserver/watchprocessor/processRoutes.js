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

    try {
      var processor = new taskProcessor();
      var result = processor.processNewTask(watchtask);
    } catch(err) {
      res.status(400).json({error:err.message});
    }

    return res.status(200).json({status: "success"});
});

module.exports = router;
