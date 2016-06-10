angular.module("tattva")
.service('LoadDataSources', ['$http', function($http){

  this.getdatasources=function(namespace){
      return $http.get("/instance/"+ namespace);
  };

}]);
