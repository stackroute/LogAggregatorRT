angular.module('tattva')
.service('namespaceService',['$http',function($http){
  this.getData=function(){
    return $http.get('/viewNamespace');
  }
}]);

angular.module('tattva')
.service('instanceService',['$http',function($http){
  this.getData=function(){
    return $http.get('/viewInstance')
  }
}]);

angular.module('tattva')
.service('streamService',['$http',function($http){
  this.getData=function(){
    return $http.get('/viewStream')
  }
}]);
