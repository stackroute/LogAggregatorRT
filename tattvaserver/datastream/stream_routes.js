var stream_router = require('express').Router();
var stream = require('./stream.js');

stream_router.get('/', function(req, res, next) {
  stream.find({},{streamname:1, instance:1}, function(err, data){
    res.send(data);
  });
});


stream_router.get('/details/:streamname', function(req, res, next) {
  stream.findOne({streamname : req.params.streamname} , function(err, data){
    if(err){
      console.error(err);
    }
    res.send(data);
  });
});

stream_router.get('/:sendData', function(req, res, next) {
  console.log("reached in the find stream route with namespace = ", req.params.sendData );
  stream.find({namespace : req.params.sendData} , function(err, data){
    if(err){
      console.error(err);
    }
    console.log("data from the stream route containing list of streams for a particular namespace",data);
    res.send(data);
  });
});

stream_router.post('/',function (request, response) {
  var streamObj = request.body;
  streamObj.status="active";
  var stream1 = new stream(streamObj);
  stream1.save(function(err, savestreamdata){
    if(err) return console.error(err);
  });
});

stream_router.put('/:streamname',function (request, response) {
  var streamObj = request.body;
// console.log("streamObj == ", streamObj.streamname);
  stream.update({streamname : streamObj.streamname}, streamObj, function(err, updatedObj){
    if(err){
      console.error("updating failed. Got update time error.",err);
    }
    console.log("Stream "+updatedObj+" is updated." );
  });
});

module.exports = stream_router;
