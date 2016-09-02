angular.module("tattva")
.controller('InputValueCtrl',['$scope','fndef','index','$mdDialog',function($scope,fndef,index,$mdDialog)
{
  $scope.hide = function() {
    $mdDialog.hide();
  };

  $scope.updateBackPublisher = function() {
     fndef.condition[index-1].rhs=$scope.inputvalue;
     $mdDialog.hide($scope.fieldData);
  };

  $scope.cancel = function() {
    $mdDialog.cancel();
  };

}]);
