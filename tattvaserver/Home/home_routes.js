var express = require('express');
var sideNav_router = express.Router();

var home = require('./home.js');

sideNav_router.use(function(req, res, next) {
    console.log("we reached in the middleware-----------------------------------------------");
    // var item= new home({
    //   "menu" : "Organisation",
    //       "link" : "organisation",
    //       "icon" : "group"
    // });
    // item.save(function (err) {
    //   if (err) {
    //     console.log(err);
    //     return handleError(err);
    //   }
    // });
    next();
});

// namespace_router.get('/', function(req, res) {
//     res.send('hello ' + req.params.name + '!');
// });
sideNav_router.get('/', function(req, res) {
console.log("we reached in the route-------------------------------------------------------------------------------");
  home.find({},{menu:1,link:1,icon:1,children:1},function (err, sideNavItems) {
    console.log(sideNavItems);
    res.send(sideNavItems);
  })
});

module.exports = sideNav_router;
