angular.module("tattva")
.controller("saveToDB",["$scope","$mdDialog","data", function($scope,$mdDialog,data){
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.publisherData = data;
  $scope.dbName=data.name;
  $scope.updateBackPublisher = function(Data) {
    $scope.publisherData.saveas=$scope.dbName;
    console.log($scope.publisherData.saveas);
    // console.log(Data);
    // $scope.name="saveToDB";
    // var publisherExp2={
    //   "publishType":$scope.name,
    //   "publisherDb":$scope.dbName
    // }
    // console.log(publisherExp2);
    // $scope.parentpublisherdata.publisher.push(publisherExp2);

    $mdDialog.hide($scope.publisherData);
  }

  $scope.hide = function() {
    $mdDialog.hide();
  };
}])
