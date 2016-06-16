angular.module('tattva')
.factory('designhomeFactory',['$http',function($http){
  var summary={
    getdata : function(){
      return $http.get('/appsummary/');
    }
  }
  return summary;
}]);
