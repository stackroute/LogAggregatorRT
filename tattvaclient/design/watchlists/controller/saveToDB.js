angular.module("tattva")
.controller("saveToDB",["$scope","$mdDialog","data", function($scope,$mdDialog,data){
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
$scope.dbName=data.name;
$scope.parentpublisherdata=data;
$scope.updateBackPublisher = function(Data) {
console.log(Data);
$scope.name="saveToDB";
var publisherExp2={
"publishType":$scope.name,
"publisherDb":$scope.dbName
}
console.log(publisherExp2);
$scope.parentpublisherdata.publisher.push(publisherExp2);
$mdDialog.hide();
}

  $scope.hide = function() {
    $mdDialog.hide();
  };
}])
