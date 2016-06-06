var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var stream_router = require('express').Router();
stream_router.use(bodyParser.json());
stream_router.use(bodyParser.urlencoded({ extended: false }));
var stream = require('./stream.js');



stream_router.use('/', function(req, res, next) {
    console.log('router use invoked');
    next();
});
stream_router.get('/', function(req, res, next) {
    console.log('router use invoked');
    next();
});



stream_router.post('/',jsonParser,function (request, response) {
// console.log("hello routes");
var streamObj = request.body;
streamObj.status="active";
console.log("reached watchlist with body data");
// watchlistObj.findOne({org_Name:'Retina'}).then(function(org){
  streamObj.id = streamObj.name;
  var stream1 = new stream(streamObj);
  stream1.save(function(err, savestreamdata){
    if(err) return console.error(err);
  });
// })
});

module.exports = stream_router;
