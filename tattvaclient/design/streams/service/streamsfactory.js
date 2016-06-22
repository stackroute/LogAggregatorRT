angular.module('tattva')
.factory('streamFactory',['$http',function($http){
  var streamData={
    sendStream : function(sendData){
      console.log("STREAM FACTORY NAMESPACE name",sendData);
      return $http.get('/datastream/'+sendData);
    },

    sendStreamdata : function(streamname){
      return $http.get('/datastream/details/'+streamname)
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
        url : '/datastream/'+streamDataToSave.streamname,
        data : streamDataToSave
      }).then(function(response)
      {
        if (response.data.errors) {
          // console.log("testing123:",

          response.data.errors;
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
