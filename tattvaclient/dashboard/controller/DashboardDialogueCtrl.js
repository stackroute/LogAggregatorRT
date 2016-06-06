angular.module('tattva')
.controller('DialogController', ['$scope','$mdDialog',
function($scope, $mdDialog, watchslidename) {
  $scope.watchslidename=watchslidename;
  console.log($scope.watchslidename);
  $scope.cancel=function()
  {
    $mdDialog.hide();
  };

  $scope.hide = function() {
    $mdDialog.hide();
  };

  $scope.savedata=function()
  {
    console.log("inside save");
    $mdDialog.hide($scope.watchslidename);
  }

}]);
