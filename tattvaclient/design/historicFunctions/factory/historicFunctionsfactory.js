angular.module('tattva')
.factory('historicfunctionsFactory', ['$http','$q', function($http, $q){
var factory={

	savehistoricfunctions: function(createhistoricfunctions) {
      return $q(function(resolve, reject) {
        $http.post('/historicfunctions/'+createhistoricfunctions.name, createhistoricfunctions)
        .then(function(res) {
          resolve(res.data);
        },
        function(res) {
          reject(res.data);
        }
        );
      });
    },

	gethistoricfunctions: function() {
      return $q(function(resolve, reject) {
        $http.get('/historicfunctions')
        .then(function(res) {
        resolve(res.data);
      },
      function(res) {
        reject(res.data);
      });
      });
    },

    gethistoricfunctionsDetails: function(historicfunctionsName){
      return $q(function(resolve, reject) {
        $http.get('/historicfunctions/'+historicfunctionsName)
        .then(function(res) {
        resolve(res.data);
      },
      function(res) {
        reject(res.data);
      });
      });
    },

    sethistoricfunctionsDetails : function(data, historicfunctionsName){
      return $q(function(resolve, reject) {
        $http.put('/historicfunctions/'+historicfunctionsName, data)
        .then(function(res) {
        resolve(res.data);
      },
      function(res) {
        reject(res.data);
      });
      });
    },

}
return factory;

}]);
