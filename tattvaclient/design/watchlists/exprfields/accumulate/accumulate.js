angular.module("tattva")
.controller('AccumulateCtrl',['$scope','$mdDialog','fieldData','loadExprData',function($scope,$mdDialog,fieldData,loadExprData)
{
  $scope.function=[];
  loadExprData.getFunction().then(function(result){
  var data=result.data;
  console.log(data);
  return data;
  }).then(function(data)
  {
  for(i in data)
  {
  $scope.function.push(data[i].name);
  }
  console.log($scope.function);
  });

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
