var mongoose = require('mongoose');
var namespace = require('../namespace/namespaces.js');
var data = {
  name : "Tattva",
  instanceType : "superUser",
  level : 1,
  children : []
};

var namespaces = [];
var instance = [];
var stream = [];
var watchlist = [];

// var namespaceCollection = mongoose.model('namespaces');
// namespace.find({},function(err,namespaces){
//   if(err){
//     console.log("could not find the collection namespace error:",err);
//   }
//   console.log("namespace ",namespace);
// });
// console.log("namespaces,",namespace);
namespace.find({},{name:1, dataSchema:1}, function(err, namespaceListData){
  if(err){
    console.log("Error occurred in getting namespaces ", err);
    return res.status(400).json({error:"Internal error occurred..!"});
  } else{
    return res.status(200).json(namespaceListData);
  }
});
console.log("namespaces", namespaces);
