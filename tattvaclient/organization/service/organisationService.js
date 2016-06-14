angular.module('tattva')
.factory('userservice', ['$http', function($http){
  var factory = {
    saveUser: function(createUsermData) {
      $http({
        method  : 'post',
        url     : '/organisation/user/'+createUsermData.name,
        data    : createUsermData
      })
      .then(function(response)
      {
        if (response.data.errors) {
          $scope.errorName = response.data.errors.name;
        } else {
          $scope.message = response.data.message;
        }
      });
    },


    getUserName: function() {
      return $http.get('/organisation/user/:userName').then(function(response) {
        return response.data;
      });
    },
    editUser: function(userData) {
      $http({
        method  : 'put',
        url     : '/organisation/user/'+userData.name,
        data    : userData
      })
      .then(function(response)
      {
        if (response.data.errors) {
          $scope.errorName = response.data.errors.name;
        } else {
          $scope.message = response.data.message;
        }
      });
    }
  }//end of factory definition
  return factory;
}]);
