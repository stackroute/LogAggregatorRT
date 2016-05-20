angular.module('tattva')
.factory('streamFactory','$http',function($http){
  var streamData={
    sendStream : function(sendData){

      var result = [{
        "namespace": "apacheTomcat",
        "instance": "ap_instance",
        "streamname": "stream-1a",
        "description": "This is apache stream",
        "query": [{
          "field": "response code",
          "operator": "==",
          "value": "200"
        }]
      }, {
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
    }
  }
  return streamData;
});
