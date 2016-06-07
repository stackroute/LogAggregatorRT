angular.module("tattva")
.controller("saveToDB",["$scope","$mdDialog","data", function($scope,$mdDialog,data){
  $scope.dbName=data.name;
  console.log($scope.dbName);
  
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.hide = function() {
    $mdDialog.hide();
  };
}])
