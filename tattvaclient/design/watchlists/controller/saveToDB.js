angular.module("tattva")
.controller("saveToDB",["$scope","$mdDialog","data","publisherData", function($scope,$mdDialog,data,publisherData){
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.publisherData = publisherData;
  $scope.dbName=data.name;
  $scope.updateBackPublisher = function(Data) {
    $scope.publisherData.saveas=$scope.dbName;
    $mdDialog.hide($scope.publisherData);
  }

  $scope.hide = function() {
    $mdDialog.hide();
  };
}])
