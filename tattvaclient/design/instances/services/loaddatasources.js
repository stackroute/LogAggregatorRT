angular.module("tattva")
.service('loaddatasources', ['$http', function($http){

  this.getdatasources=function(namespace){
      return $http.get("/instance/"+ namespace);
  };

}]);
