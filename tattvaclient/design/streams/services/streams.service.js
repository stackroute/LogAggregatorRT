var tattva = angular.module('tattva');

tattva.service('namespaceService',['$http',function($http){
  this.getData=function(){
    return $http.get('/viewNamespace');
  }
}]);

tattva.service('instanceService',['$http',function($http){
  this.getData=function(){
    return $http.get('/viewInstance')
  }
}]);

tattva.service('streamService',['$http',function($http){
  this.getData=function(){
    return $http.get('/viewStream')
  }
}]);
