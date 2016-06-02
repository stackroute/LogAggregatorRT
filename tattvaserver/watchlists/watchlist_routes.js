var watchlist_router = require('express').Router();
var watchlist = require('./watchlists.js');

// watchlist_router.use(function(req, res, next) {
// console.log(req.method, req.url);
// console.log("we reached in the middleware-------------------------------------------------------------------------------");
// next();
// });


watchlist_router.get('/', function(req, res, next) {
console.log("we reached in the route-------------------------------------------------------------------------------");
console.log("we reached in the middleware-------------------------------------------------------------------------------");
res.send('hello !');
});
watchlist_router.post('/',function(req,res,next){
console.log("I am Surya")


});

module.exports=watchlist_router;
