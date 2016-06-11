angular.module("tattva")
.controller("saveToDB",["$scope","$mdDialog","data","publisherData", function($scope,$mdDialog,data,publisherData){
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.publisherData = publisherData;
  console.log(data);
  $scope.dbName=data.name;
  console.log($scope.dbName);
  $scope.updateBackPublisher = function(Data) {
    $scope.publisherData.saveas=$scope.dbName;
    console.log($scope.publisherData.saveas);
    $mdDialog.hide($scope.publisherData);
  }

  $scope.hide = function() {
    $mdDialog.hide();
  };
}])
