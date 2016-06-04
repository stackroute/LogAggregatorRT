var datastream_router = require('express').Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var Datastream = require('./datastreams.js');
datastream_router.use(bodyParser.json());
datastream_router.use(bodyParser.urlencoded({ extended: false }));
datastream_router.use(function(req, res, next) {
console.log(req.method, req.url);
console.log("we reached in the middleware-----------------------------");
next();
});
datastream_router.get('/', function(req, res, next) {
    console.log('router use invoked stream');
    res.send("hi");
    next();
});

datastream_router.post('/',jsonParser,function(request,response,next){
  console.log("hi");
  var datastreamObj=request.body;
  var datastream1=Datastream(dataStreamObj);
  datastream1.save(function(err,savedatastream)
{
  if(err) return console.error(err);
});
next();
});


module.exports = datastream_router;
