angular.module("tattva")
.service('loaddatasources', ['$http', function($http){

  this.getdatasources=function(namespace){
    console.log(namespace);
    return $http.get("/instance/"+ namespace);
  };


//   this.getNamespaceInstances=function(namespace){
//       return $http.get("/instance/"+ namespace);
// console.log(namespace);
//   };



}]);
