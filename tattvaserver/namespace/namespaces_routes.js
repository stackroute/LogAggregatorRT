var namespace_router = require('express').Router();
var Namespace = require('./namespaces.js');

namespace_router.get('/', function(req, res){
  Namespace.find({},{name:1, dataSchema:1}, function(err, namespaceListData){
    if(err){
      return res.status(400).json(err);
    }
    else{
      return res.status(200).json(namespaceListData);
    }
  });
});

namespace_router.post('/:namespaceName', function (req, res) {
  var namespaceObj = req.body;
  namespaceObj.tag = namespaceObj.name + namespaceObj.createdOn;//logic to obtain unique tag name
  var namespace1 = new Namespace(namespaceObj);
  namespace1.save(function(err, savedNamespaceData){
    if(err){
      return res.status(400).json(err);
    }
    else{
      return res.status(200).json(savedNamespaceData);
    }
  });
});

namespace_router.put('/:namespaceName',  function (req, res) {
  Namespace.update({_id:req.body._id}, req.body, {}, function(err, updatedNamespaceData){
    if(err){
      return res.status(400).json(err);
    }
    else{
      return res.status(200).json(updatedNamespaceData);
    }
  });
});

namespace_router.get('/:namespaceName', function(req, res){
  Namespace.findOne({name:req.params.namespaceName}, function(err, namespaceData){
    if(err){
      return res.status(400).json(err);
    }
    else{
      return res.status(200).json(namespaceData);
    }
  });
});

module.exports = namespace_router;
