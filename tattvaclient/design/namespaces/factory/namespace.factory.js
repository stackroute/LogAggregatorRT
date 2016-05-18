angular.module('tattva')
.factory('namespaceFactory', ['$http', function($http){
  var factory = {
    saveNameSpace: function(createNamespaceFormData) {
      console.log("Hello to save the config = ",createNamespaceFormData);
      $http({
        method  : 'post',
        url     : '/namespaces',
        data    : createNamespaceFormData
      })
      .then(function(response)
      {
        if (response.data.errors) {
          // Showing errors.
          $scope.errorName = response.data.errors.name;
        } else {
          $scope.message = response.data.message;
        }
      });
    },
    getNameSpace: function() {
      console.log("in factory namespace list`");

      return $http.get('/namespaces').then(function(response) {
        // console.log(response.data);
        data =  response.data;
        console.log('data=',data);
        return data;
      });
    },

    getNamespaceDetails: function(namespaceName){
      console.log(namespaceName);
      var config = {
        params: {"name" : namespaceName }
      }
       return $http.get('/namespace',config)
      .then(function(response) {
        console.log(response.data);
        data =  response.data;
        console.log('data=',data);
        return data;
      });
    },
    setNamespaceDetails : function(data){
      console.log(data);
    }
  }//end of factory definition
  return factory;
}]);
