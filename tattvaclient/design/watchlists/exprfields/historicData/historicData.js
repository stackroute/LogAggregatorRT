
angular.module("tattva")
.controller('HistoricDataCtrl',['$scope','$mdDialog','fieldData',function($scope,$mdDialog,fieldData)
{
  $scope.fieldData=fieldData;
  //console.log("dialogueData data within publisherCtrl is : ", $scope.fieldData);
  $scope.hide = function() {
    $mdDialog.hide();
  };

  $scope.updateBackPublisher = function() {
    $scope.fieldData.exprAsText = $scope.getExprAsText();
    $mdDialog.hide($scope.fieldData);
  };

  $scope.cancel = function() {
    $mdDialog.cancel();
  };

  $scope.getExprAsText =function(){
 return $scope.fieldData.historicfunction+"("+$scope.fieldData.historicfunctionparam+")";
  }

}]);
