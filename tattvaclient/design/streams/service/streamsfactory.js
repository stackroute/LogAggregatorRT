angular.module('tattva')
.factory('streamFactory',function(){
  var streamData={
    sendStream : function(sendData){

      var result = [
      {
        "namespace": "apacheTomcat",
        "instance": "ap_instance",
        "streamname": "stream-1a",
        "description": "This is apache stream",
        "query": [{
          "field": "response code",
          "operator": "==",
          "value": "200"
        }]
      },
      {
        "namespace": "ngnix",
        "instance": "nx_instance",
        "streamname": "stream-2",
        "description": "This is ngnix stream",
        "query": [{
          "field": "response code",
          "operator": ">",
          "value": "300"
        }]
      }];

      return result;
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
});
