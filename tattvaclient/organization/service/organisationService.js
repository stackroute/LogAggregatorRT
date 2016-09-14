angular.module('tattva')
  .factory('userservice', ['$http', function($http) {
    var factory = {
        saveUser: function(createUsermData) {
          $http({
              method: 'post',
              url: '/organisation/' + createUsermData.name,
              data: createUsermData
            })
            .then(function(response) {
              if (response.data.errors) {
                return response.errorName = response.data.errors.name;
              } else {
                return response.message = "New User created successfully..!";
              }
            });
        },
        getUserName: function() {
          return $http.get('/organisation/:userName').then(function(response) {
            var data = response.data;
            return data;
          });
        },
        getUser: function(username) {
          return $http.get('/organisation/srch/' + username).then(function(response) {
            var data = response.data;
            return data;
          });
        },
        editUser: function(userData) {
          console.log(userData);
          return $http({
              method: 'patch',
              url: '/organisation/' + userData.name,
              data: userData
            })
            .then(function(response) {
              if (response.data.errors) {
                return response.errorName = response.data.errors.name;
              } else {
                return response.message = "User details updated..!";
              }
            });
        }
      } //end of factory definition
    return factory;
  }]);
