var namespace_router = require('express').Router();
var Namespace = require('./namespaces.js');

namespace_router.get('/', function(req, res){
  Namespace.find({},{name:1, dataSchema:1}, function(err, namespaceData){
    if(err){
      console.error(err);
    }
    res.send(namespaceData);
  });
});

namespace_router.post('/', function (request, response) {
  var namespaceObj = request.body;
  namespaceObj.tag = namespaceObj.name + namespaceObj.createdOn;//logic to obtain unique tag name
  var namespace1 = new Namespace(namespaceObj);
  namespace1.save(function(err, savedNamespace){
    if(err){
      console.error(err);
    }
    return savedNamespace;
  });
});

namespace_router.put('/',  function (request, response) {
  Namespace.update({_id:request.body._id}, request.body,{},function(err, updatedObj){
    if(err){
      console.log(err);
    }
    console.log('Namespace updated! ' , updatedObj);
  });
});

namespace_router.get('/:name', function(req, res){
  Namespace.findOne({name:req.params.name}, function(err, namespaceData){
    if(err){
      console.error(err);
    }
    res.send(namespaceData);
  });
});

module.exports = namespace_router;
