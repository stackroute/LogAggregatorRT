var organisation_router = require('express').Router();
// var Organisation = require('./organisations.js');

// namespace_router.get('/', function(req, res) {
//     res.send('hello ' + req.params.name + '!');
// });
organisation_router.get('/', function(req, res) {
console.log("we reached in the route-------------------------------------------------");
});

module.exports = organisation_router;
