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
  stream.find({},{streamname:1, instance:1}, function(err, data){
  res.send(data);
})
});

stream_router.get('/:sendData', function(req, res, next) {
console.log("reached in the find stream route with namespace = ", req.params.sendData );
  stream.find({namespace : req.params.sendData} , function(err, data){
    if(err){
      console.error(err);
    }
    console.log("stream name : ",data);
    res.send(data);
  });
});

// stream_router.get('/:namespace/:stream', function(req, res, next) {
//   console.log("reached in the find stream route with namespace = ", req.params.namespace , "   and   strean ", req.params.stream );
//   stream.find({namespace :req.params.namespace, streamname:req.params.streamname} , function(err, data){
//     if(err){
//       console.error(err);
//     }
//     console.log("stream name : ",data);
//     res.send(data);
//   });
// });

stream_router.post('/',function (request, response) {
  // console.log("hello routes");
  var streamObj = request.body;
  streamObj.status="active";
  console.log("reached watchlist with body data");
  // watchlistObj.findOne({org_Name:'Retina'}).then(function(org){
  // streamObj.id = streamObj.name;
  var stream1 = new stream(streamObj);
  // console.log("sdfds",stream1);
    stream1.save(function(err, savestreamdata){
      if(err) return console.error(err);
  console.log("savestreamdata = ",savestreamdata);
    });
  // })
// res.send(streamObj)
});

module.exports = stream_router;
