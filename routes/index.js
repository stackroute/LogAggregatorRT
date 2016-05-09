var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.get('/usrmn/:usrstate', function(req, res, next) {
//   var usrState = 'guest'; //req.getParam();
//   var usrMenuActions = {};
//
//   if(usrState == 'member') {
//     usrMenuActions = {};
//   } else if (usrState == 'guest'){
//     usrMenuActions = {};
//   }
//   res.send(usrMenuActions);
// });
module.exports = router;
