var tattva = angular.module('tattva');
tattva.factory('namespaceFactory', ['$http',function($http){
  var factory = {
    saveNameSpaceData: function(createNamespaceFormData) {
      console.log("Hello to save the config = ",createNamespaceFormData);
      $http({
        method  : 'post',
        url     : '/saveNamespaceData',
        data    : createNamespaceFormData //forms user object
        // headers : {'Content-Type': 'application/x-www-form-urlencoded'}
      })
      .success(function(data) {
        if (data.errors) {
          // Showing errors.
          $scope.errorName = data.errors.name;
        } else {
          $scope.message = data.message;
        }
      });

    },
    getNameSpace: function() {
      console.log("in factory save data`");
      var data=[];
      $http.get('/nameSpaceList').then(function(response) {
        console.log(response.data);
        data =  response.data;
        console.log('data=',data);
        return data;
      });
      console.log('data=',data);
    }
  }//end of factory definition
  return factory;
}]);
