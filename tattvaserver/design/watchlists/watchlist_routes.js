var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var watchlist_router = require('express').Router();
watchlist_router.use(bodyParser.json());
watchlist_router.use(bodyParser.urlencoded({ extended: false }));
var watchlist = require('./watchlists.js');



watchlist_router.use('/', function(req, res, next) {
    console.log('router use invoked');
    next();
});
watchlist_router.get('/', function(req, res, next) {
    console.log('router use invoked');
    next();
});



watchlist_router.post('/',jsonParser,function (request, response) {
// console.log("hello routes");
var watchlistObj = request.body;
watchlistObj.status="active";
console.log("reached watchlist with body data");
// watchlistObj.findOne({org_Name:'Retina'}).then(function(org){
  watchlistObj.id = watchlistObj.name;
  var watchlist1 = new watchlist(watchlistObj);
  watchlist1.save(function(err, savewatchlistdata){
    if(err) return console.error(err);
  });
// })
});

module.exports = watchlist_router;
