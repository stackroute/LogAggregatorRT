angular.module('tattva')
.controller('viewStreamsCtrl',['$scope', '$http' , '$stateParams', 'streamFactory', 'namespaceService',
function($scope, $http, $stateParams, streamFactory, namespaceService){
  $scope.nsname=$stateParams.nsname;
  $scope.streamResultData={};

  namespaceService.getData().success(function(data){
    $scope.namespace_collection=data;
  });

  $scope.getStreamData=function(nsname){
    streamFactory.sendStream(nsname).then(function(res){
    $scope.streamResultData = res;
    console.log($scope.streamResultData);
  });
  }
}])
