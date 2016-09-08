angular.module('tattva')
.factory('functionFactory', ['$http','$q', function($http, $q){
  var factory = {

    saveFunction: function(createFunction) {
      return $q(function(resolve, reject) {
        $http.post('/compositefunction/'+createFunction.name,createFunction)
        .then(function(res) {
          //success
          resolve(res.data);
        },
        function(res) {
          //error
          reject(res.data);
        }
        );
      });
    },

    getFunction: function() {
    return $q(function(resolve, reject) {
      $http.get('/compositefunction')
      .then(function(res) {
        //success
        // console.log(res.data);
        resolve(res.data);
      },
      function(res) {
        //error
        reject(res.data);
      });
    });
  },

  }

  //end of factory definition
  return factory;
}]);
