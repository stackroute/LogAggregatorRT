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

    setNamespaceDetails : function(data, namespaceName){
      console.log("data to be updated from factory = ",data);
      var config = {
        params: {"name" : namespaceName }
      }
      return $http.put('/namespace/', data, config)
      .then(
       function(response){
         return false;
       }
      );
    },

    getJSONObject : function (inputJSONObj){
      inputJSONObj = JSON.parse(inputJSONObj)
      console.log("inputJSONObj = ",inputJSONObj);
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
      console.log("outputData= ",outputData);
      return outputData;
    }

  }//end of factory definition
  return factory;
}]);
