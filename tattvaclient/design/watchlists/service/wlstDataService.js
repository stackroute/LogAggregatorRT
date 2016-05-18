angular.module("tattva")
.service('wlstDataService', ['$http', function($http){
  this.getData = function() {
    return $http.get('/viewwatchlist');
  }
}]);
