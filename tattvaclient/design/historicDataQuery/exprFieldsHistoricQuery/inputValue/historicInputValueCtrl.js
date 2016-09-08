angular.module("tattva")
.controller('historicInputValueCtrl',['$scope','criteria','$mdDialog',function($scope,criteria,$mdDialog)
{
  $scope.hide = function() {
    $mdDialog.hide();
  };

  $scope.updateBackPublisher = function() {
    criteria.rhs={};
    criteria.rhs.value=$scope.inputvalue;
    criteria.rhs.type="Input Value";
    $mdDialog.hide();
  };

  $scope.cancel = function() {
    $mdDialog.cancel();
  };

}]);
