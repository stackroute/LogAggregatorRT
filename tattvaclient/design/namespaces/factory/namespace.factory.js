angular.module('tattva')
.factory('namespaceFactory', ['$http', function($http){
  var factory = {
    saveNameSpace: function(createNamespaceFormData) {
      $http({
        method  : 'post',
        url     : '/namespaces',
        data    : createNamespaceFormData
      })
      .then(function(response)
      {
        return true;
        // if (response.data.errors) {
        //   // Showing errors.
        //   $scope.errorName = response.data.errors.name;
        // } else {
        //   $scope.message = response.data.message;
        // }
      });
    },
    getNameSpace: function() {
      return $http.get('/namespaces').then(function(response) {
        data =  response.data;
        return data;
      });
    },

    getNamespaceDetails: function(namespaceName){
      return $http.get('/namespaces/'+namespaceName)
      .then(function(response) {
        data =  response.data;
        return data;
      });
    },

    setNamespaceDetails : function(data, namespaceName){
      var config = {
        params: {"name" : namespaceName }
      }
      return $http.put('/namespaces/', data, config)
      .then(
        function(response){
          return false;
        }
      );
    },
    // return $http.get('/namespaces/'+namespaceName)
    // .then(function(response) {
    //   data =  response.data;
    //   return data;
    //   });
    // },


    setNamespaceDetails : function(data, namespaceName){
      var config = {
        params: {"name" : namespaceName }
      }
      return $http.put('/namespaces/', data, config)
      .then(
        function(response){
          return false;
        }
      );
    },
    getJSONObject : function (inputJSONObj){
      inputJSONObj = JSON.parse(inputJSONObj)
      var dataObj = inputJSONObj[0];
      var outputData = [];
      var type;
      for ( var i in dataObj){
        if (isNaN(dataObj[i])){
          type = "dimension"
        }
        else{
          type = "measure"
        }
        outputData.push({"alias": i, "name": i, "type": type  });
      }
      return outputData;
    }

  }//end of factory definition
  return factory;
}]);
