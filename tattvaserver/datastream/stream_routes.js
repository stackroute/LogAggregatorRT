var stream_router = require('express').Router();
var stream = require('./stream.js');

stream_router.get('/', function(request, res, next) {
  stream.find({},{streamname:1, instance:1}, function(err, data){
    res.send(data);
  });
});


stream_router.get('/details/:streamname', function(request, res, next) {
  stream.findOne({streamname : request.params.streamname} , function(err, data){
    if(err){
      console.error(err);
    }
    res.send(data);
  });
});

stream_router.get('/:namespaceName', function(request, res, next) {
  console.log("reached in the find stream route with namespace = ", request.params.namespaceName );
  stream.find({namespace : request.params.namespaceName} , function(err, data){
    if(err){
      console.error(err);
    }
    console.log("data from the stream route containing list of streams for a particular namespace",data);
    res.send(data);
  });
});

stream_router.post('/:streamName',function (request, response) {
  var streamObj = request.body;

  console.log("reached stream post route to save ", streamObj);
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
