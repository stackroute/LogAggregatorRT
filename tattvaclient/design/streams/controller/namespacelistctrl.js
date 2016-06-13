angular.module('tattva')
.controller('namespaceListCtrl',['$scope', '$http','namespaceFactory',function($scope, $http, namespaceFactory){

  $scope.tabTitle ="Streams";
  $scope.stateChange="design.create";

  namespaceFactory.getNameSpace().then(function(response){
    $scope.data=response;
    console.log($scope.data);
  });
}])
