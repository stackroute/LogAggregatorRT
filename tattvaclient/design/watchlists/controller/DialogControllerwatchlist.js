angular.module("tattva")
.controller('DialogControllerwatchlist',['$scope','$mdDialog','dialogueData',function($scope,$mdDialog,dialogueData)
{
  $scope.dialogueData=dialogueData;
  console.log("dialogueData data within publisherCtrl is : ", $scope.dialogueData);
  $scope.hide = function() {
    $mdDialog.hide();
  };

  $scope.updateBackPublisher = function() {
    $mdDialog.hide($scope.dialogueData);
  };

  $scope.cancel = function() {
    $mdDialog.cancel();
  };

}]);

angular.module("tattva")
.controller('DialogControllerwatchlist2',['$scope','$mdDialog','data2',function($scope,$mdDialog,data2)
{
  console.log("dialogueData data within publisherCtrl is : ", $scope.dialogueData);
  $scope.dialogueData2=data2;

  $scope.hide = function() {
    $mdDialog.hide();
  };

  $scope.updateBackPublisher = function() {
    $mdDialog.hide($scope.dialogueData2);
  };

  $scope.cancel = function() {
    $mdDialog.cancel();
  };

}]);
