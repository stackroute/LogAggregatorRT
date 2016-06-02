angular.module("tattva")
.controller("saveToDB",["$scope","$mdDialog", function($scope,$mdDialog){
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.hide = function() {
    $mdDialog.hide();
  };
}])
