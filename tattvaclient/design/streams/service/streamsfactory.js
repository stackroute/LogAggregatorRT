angular.module('tattva')
.factory('streamFactory',['$http',function($http){
  var streamData={
    sendStream : function(sendData){

      return $http.get('/datastream/'+sendData)
      .then(function(response){
        data=response.data;
        return data;
      });
    }
  }
  return streamData;
}]);
