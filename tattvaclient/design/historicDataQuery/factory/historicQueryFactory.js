angular.module('tattva')
.factory('historicQueryFactory', ['$http','$q', function($http, $q){
var factory={

	saveHistoricQuery: function(createHistoricQuery) {
      return $q(function(resolve, reject) {
        $http.post('/historicQuery/'+createHistoricQuery.name, createHistoricQuery)
        .then(function(res) {
          resolve(res.data);
        },
        function(res) {
          reject(res.data);
        }
        );
      });
    },

	getHistoricQuery: function() {
      return $q(function(resolve, reject) {
        $http.get('/historicQuery')
        .then(function(res) {
        resolve(res.data);
      },
      function(res) {
        reject(res.data);
      });
      });
    },

    getHistoricQueryDetails: function(historicQueryName){
      return $q(function(resolve, reject) {
        $http.get('/historicQuery/'+historicQueryName)
        .then(function(res) {
        resolve(res.data);
      },
      function(res) {
        reject(res.data);
      });
      });
    },

    setHistoricQueryDetails : function(data, historicQueryName){
      return $q(function(resolve, reject) {
        $http.put('/historicQuery/'+historicQueryName, data)
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
