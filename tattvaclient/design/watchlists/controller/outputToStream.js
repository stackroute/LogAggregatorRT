angular.module("tattva")
.controller("outputToStreams",["$scope","$mdDialog", function($scope,$mdDialog){
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.hide = function() {
    $mdDialog.hide();
  };
}])
