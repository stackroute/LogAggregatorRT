angular.module('tattva')
.controller('routerCtrl',['$scope', '$http',function($scope, $http){
  $scope.tabTitle ="Streams";
  $scope.stateChange="design.create"
  $scope.loadData=function()
  {
    $http.get('/viewStreams').then(function(response) {$scope.data = response.data;} );
  };
  $scope.loadData();
}])
