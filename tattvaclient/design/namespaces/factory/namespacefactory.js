angular.module('tattva')
.factory('namespaceFactory', ['$http','$q', function($http, $q){
  var factory = {
    saveNameSpace: function(createNamespaceData) {
      return $q(function(resolve, reject) {
        $http.post('/namespaces/'+createNamespaceData.name, createNamespaceData)
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

    getNameSpace: function() {
      return $q(function(resolve, reject) {
        $http.get('/namespaces')
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

    getNamespaceDetails: function(namespaceName){
      return $q(function(resolve, reject) {
        $http.get('/namespaces/'+namespaceName)
        .then(function(res) {
        //success
        resolve(res.data);
      },
      function(res) {
        //error
        reject(res.data);
      });
      });
    },

    setNamespaceDetails : function(data, namespaceName){
      return $q(function(resolve, reject) {
        $http.put('/namespaces/'+namespaceName, data)
        .then(function(res) {
        //success
        resolve(res.data);
      },
      function(res) {
        //error
        reject(res.data);
      });
      });
    },
}//end of factory definition
return factory;
}]);
