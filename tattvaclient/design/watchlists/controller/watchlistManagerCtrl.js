angular.module("tattva")
.controller("watchlistManagerCtrl",["$scope","$mdDialog","data", function($scope,$mdDialog,data){
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
$scope.watchlistName=data.name;
}])
