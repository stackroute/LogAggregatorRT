angular.module('tattva')
.controller('addwatchlistCtrl', ['$scope','$mdDialog',
function($scope, $mdDialog, watchslidename) {
  $scope.watchslidename=watchslidename;
  $scope.cancel=function()
  {
    $mdDialog.hide();
  };

  $scope.hide = function() {
    $mdDialog.hide();
  };

  $scope.savedata=function()
  {
    $mdDialog.hide($scope.watchslidename);
  }

}]);
