angular.module("tattva")
.controller('AccumulateCtrl',['$scope','$mdDialog','fieldData','loadExprData','namespaceFactory','fieldData2',function($scope,$mdDialog,fieldData,loadExprData,namespaceFactory,fieldData2)
{
  $scope.namespace=fieldData2.namespace;
  $scope.function=[];

  loadExprData.getFunction().then(function(result){
    var data=result.data;
    //console.log(data);
    return data;
  }).then(function(data) {
    for(i in data) {
      if(data[i].type == 'aggregate') {
        $scope.function.push(data[i].name);
      }
    }
  });

  $scope.funParam=[];
  namespaceFactory.getNamespaceDetails($scope.namespace).then(function(data){
    for (i in data.dataSchema){
      $scope.funParam.push(data.dataSchema[i].name);
    }
  });


  $scope.fieldData=fieldData;
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

  $scope.getExprAsText=function(){
    return "Accumulate(@"+$scope.fieldData.AccumulateOn+"("+$scope.fieldData.AccumulateTill+").then("+$scope.fieldData.FunctionenPostAccumulation+"("+$scope.fieldData.FunctionenPostAccumulationParam+"))" ;
  }

}]);
