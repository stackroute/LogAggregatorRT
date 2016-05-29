angular.module("tattva")
.controller('ConstantCtrl',['$scope','$mdDialog','fieldData','loadExprData',function($scope,$mdDialog,fieldData,loadExprData)
{
$scope.constantOption=loadExprData.getConstants();
console.log($scope.constantOption);
  $scope.getExprAsText =function(){
  return "Constant<"+$scope.fieldData.Constants+">";  // logic for converting the data to human redable easy format of the expression
  }
  $scope.fieldData=fieldData;
  console.log("dialogueData data within publisherCtrl is : ", $scope.fieldData);
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
  return "Constant:"+$scope.fieldData.Constant  // logic for converting the data to human redable easy format of the expression

}]);
