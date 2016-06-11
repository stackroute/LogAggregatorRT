angular.module('tattva')
.factory('OrgService', ['$http', function($http){
  var factory = {
    saveOrgUser: function(createUsermData) {
      $http({
        method  : 'post',
        url     : '/organisation/user',
        data    : createUsermData
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


    getUserName: function() {
      return $http.get('/userName').then(function(response) {
      // console.log(response.data);
        data =  response.data;
        return data;
      });
    },

    // getNamespaceDetails: function(namespaceName){
    //   console.log("In the get namespace factory method",namespaceName);
    //   return $http.get('/namespaces/'+namespaceName)
    //   .then(function(response) {
    //     data =  response.data;
    //     return data;
    //     });
    //   },
    //
    //
    //   setNamespaceDetails : function(data, namespaceName){
    //     console.log("data to be updated from factory = ",data);
    //     var config = {
    //       params: {"name" : namespaceName }
    //     }
    //     return $http.put('/namespaces/', data, config)
    //     .then(
    //       function(response){
    //         return false;
    //       }
    //     );
    //   },
    //
    //   getJSONObject : function (inputJSONObj){
    //     inputJSONObj = JSON.parse(inputJSONObj)
    //     console.log("inputJSONObj = ",inputJSONObj);
    //     var dataObj = inputJSONObj[0];
    //     var outputData = [];
    //     var type;
    //     for ( var i in dataObj){
    //       if (isNaN(dataObj[i])){
    //         type = "dimension"
    //       }
    //       else{
    //         type = "measure"
    //       }
    //       outputData.push({"alias": i, "name": i, "type": type  });
    //     }
    //     console.log("outputData= ",outputData);
    //     return outputData;
    //   }

    }//end of factory definition
    return factory;
  }]);
