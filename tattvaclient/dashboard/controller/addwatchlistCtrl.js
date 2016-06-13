angular.module('tattva')
.controller('addwatchlistCtrl', ['$scope','$mdDialog',
function($scope, $mdDialog, watchslidename) {
  console.log("hello inside msa");
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
