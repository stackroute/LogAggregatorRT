angular.module("tattva")
.controller('DialogControllerwatchlist',['$scope','$mdDialog',function($scope,$mdDialog)
{
  $scope.cancel=function(){
    $mdDialog.hide();
  }
}]);
