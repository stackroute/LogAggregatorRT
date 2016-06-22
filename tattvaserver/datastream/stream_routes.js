var stream_router = require('express').Router();
var stream = require('./stream.js');

stream_router.get('/', function(request, res, next) {
  stream.find({},{streamname:1, instance:1}, function(err, data){
    if(err){
      console.log("Error in find streams, error: ", err);
      res.status(500).json({error:"Internal error occurred..!"})
    }
    res.send(data);
  });
});

stream_router.get('/details/:streamname', function(request, res, next) {
  stream.findOne({streamname : request.params.streamname} , function(err, data){
    if(err){
      console.log("Stream ",request.params.streamname," not found or does not exist, error: ",err);
      res.status(500).json({error:"Requested stream not found..!"});
    }
    res.send(data);
  });
});

stream_router.get('/:namespaceName', function(request, res, next) {
  stream.find({namespace : request.params.namespaceName} , function(err, data){
    if(err){
      console.log("Stream with namespace as ",request.params.namespaceName," not found or does not exist, error: ", err);
      res.status(500).json({error:"Requested data not found..!"});
    }
    // console.log("data from the stream route containing list of streams for a particular namespace",data);
    res.send(data);
  });
});

stream_router.post('/:streamName',function (request, response) {
  var streamObj = request.body;
  // console.log("reached stream post route to save ", streamObj);
  streamObj.status="active";
  var stream1 = new stream(streamObj);
  stream1.save(function(err, savestreamdata){
    if(err) {
      console.log("Error in saving a new stream, error: ", err);
      if((String(err.errmsg)).search("E11000 duplicate key error collection") === 0) {
        return response.status(500).json({"error":"A stream already exists by that name"});
      } else {
        return response.status(500).json({error:"Internal error in saving..!"});
      }
    }
    return response.status(200).json(savestreamdata);
  });
});

stream_router.put('/:streamname',function (request, response) {
  var streamObj = request.body;
  stream.update({streamname : streamObj.streamname}, streamObj, function(err, updatedObj){
    if(err) {
      console.log("PUT request could not be completed for stream ",streamObj.streamname," error: ",err);
      res.status(500).json({error:"Operation failed with internal errors..!"})
    }

    res.json(updatedObj);
  });
});

module.exports = stream_router;
