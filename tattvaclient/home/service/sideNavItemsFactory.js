angular.module('tattva')
.factory('sideNavItemsFactory', ['$http', function($http){
  var factory = {
    getSideNavItems: function() {
      return $http.get('/sideNav').then(function(res) {
        data =  res.data;
        return data;
      });
    }
  }//end of factory definition
  return factory;
}]);
