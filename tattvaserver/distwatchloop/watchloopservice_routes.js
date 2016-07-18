var router = require('express').Router();
var logger = require('../../applogger.js');
var watchProcStore = require('./watchprocessstore');

/**
 * Register new Watch Task Processor
 */
router.post('/watchprocessor', function(req, res) {
  var watchprocessor = req.body;
  logger.debug("Register request from processor: ", watchprocessor);

  //@TODO have to verify the watch processor 
  watchProcStore.addWatchProcessor(watchprocessor);

  res.status(200).json({
    status: 'success'
  })
});

router.delete('/watchprocessor', function(req, res) {
  var watchprocessor = req.body;
  logger.debug("Dergister request from processor: ", watchprocessor);

  //@TODO have to stop any watch lists, whose tasks were running on this processor and re-build topology and execute those watchlist
  watchProcStore.removeWatchProcessor(watchprocessor);

  res.status(200).json({
    status: 'success'
  })
});

module.exports = router;