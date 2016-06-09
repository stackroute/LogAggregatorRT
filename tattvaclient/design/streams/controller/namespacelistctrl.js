angular.module('tattva')
.controller('namespaceListCtrl',['$scope', '$http','namespaceFactory',function($scope, $http, namespaceFactory){
  $scope.tabTitle ="Streams";
  $scope.stateChange="design.create"
  // $scope.loadData=function()
  // {
  //   $http.get('/viewStreams').then(function(response) {$scope.data = response.data;} );
  // };
  // $scope.loadData();

  namespaceFactory.getNameSpace().then(function(response){
    $scope.data=response;
    console.log($scope.data);
  });
}])
