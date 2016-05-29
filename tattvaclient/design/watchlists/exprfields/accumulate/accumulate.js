angular.module("tattva")
.controller('AccumulateCtrl',['$scope','$mdDialog','fieldData','loadExprData',function($scope,$mdDialog,fieldData,loadExprData)
{
var functionOption=loadExprData.getFunction().then(function(response){var data=response.data;return data}).then(function(data){
   $scope.functioName=[];
    for(i in data)
    {
      $scope.functioName.push(data[i].fun_name)
    }
    ;}
  );
  $scope.fieldData=fieldData;
  $scope.hide = function() {
    $mdDialog.hide();
  };

  $scope.updateBackPublisher = function() {
    $scope.fieldData.exprAsText = $scope.getExprAsText();
$scope.$watch('ExprAsText',function(){console.log(typeof($scope.fieldData.exprAsText))});
    $mdDialog.hide($scope.fieldData);
  };

  $scope.cancel = function() {
    $mdDialog.cancel();
  };

  $scope.getExprAsText=function(){
    return "Accumulate(@"+$scope.fieldData.AccumulateOn+"("+$scope.fieldData.AccumulateTill+").then("+$scope.fieldData.FunctionenPostAccumulation+"("+$scope.fieldData.FunctionenPostAccumulationParam+"))" ;
  }

}]);
