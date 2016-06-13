angular.module('tattva')
.factory('streamFactory',['$http',function($http){
  var streamData={
    sendStream : function(sendData){
      console.log("STREAM FACTORY NAMESPACE name",sendData);
      return $http.get('/datastream/'+sendData)
      .then(function(response){
        console.log(response);
        data=response.data;
        console.log( "inside factory data =", data);
        return data;
      });
    },

    sendStreamdata : function(streamname){
      return $http.get('/datastream/details/'+streamname)
      .then(function(response){
        data=response.data;
        console.log("inside factory data 2 =", data);
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
