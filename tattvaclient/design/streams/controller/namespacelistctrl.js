angular.module('tattva')
.controller('namespaceListCtrl',['$scope', '$http','namespaceFactory','$state',function($scope, $http, namespaceFactory,$state){
  $scope.tabTitle ="Streams";
  $scope.stateChange="design.create";

  namespaceFactory.getNameSpace().then(function(response){
    $scope.data=response;
    $scope.selectedRow = $scope.data[0].name;
    $state.go("design.streams.viewStreams",{nsname:$scope.data[0].name});
  },function(response){
    $scope.resError = response.data.error;
  });

  $scope.setClickedRow = function(index){  //function that sets the value of selectedRow to current index
    $scope.selectedRow = index;
  }

  $scope.predicate = 'name';
  $scope.reverse = false;
  $scope.order = function(predicate) {
    $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
    $scope.predicate = predicate;
  };
}])
