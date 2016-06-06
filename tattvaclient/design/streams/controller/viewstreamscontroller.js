angular.module('tattva')
.controller('viewStreamsController',['$scope', '$http' , '$stateParams', 'streamFactory', 'namespaceService',
function($scope, $http, $stateParams, streamFactory, namespaceService){
  $scope.objectJson=$stateParams.nsname;
  $scope.streamResultData={};

  namespaceService.getData().success(function(data){
    $scope.namespace_collection=data;
  });

  $scope.getStreamData=function(objectJson){
    $scope.streamResultData = streamFactory.sendStream(objectJson);
    console.log($scope.streamResultData);
  }
}])
