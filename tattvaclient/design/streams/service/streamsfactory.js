angular.module('tattva')
.factory('streamFactory',['$http',function($http){
  var streamData={
    sendStream : function(sendData){
      return $http.get('/datastream/'+sendData)
      .then(function(response){
        data=response.data;
        return data;
      });

    },
    saveStream:function(streamData)
    {
      var streamDataToSave=streamData;
      $http({
        method : 'post',
        url : '/datastream',
        data : streamDataToSave
      }).then(function(response)
      {
        if (response.data.errors) {
          // Showing errors.
          $scope.errorName = response.data.errors.name;
        } else {
          $scope.message = response.data.message;
        }
      });
    }
    // return saveStream;
  }
  return streamData;
}]);
