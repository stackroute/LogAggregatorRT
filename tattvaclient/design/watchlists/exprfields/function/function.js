angular.module("tattva")
.controller('FunctionCtrl',['$scope','$mdDialog','fieldData','loadExprData','fieldData2','namespaceFactory',function($scope,$mdDialog,fieldData,loadExprData,fieldData2,namespaceFactory)
{
  $scope.function=[];
  $scope.namespace=fieldData2.namespace;
  loadExprData.getFunction().then(function(result){
    var data=result.data;

    return data;
  }).then(function(data)
  {
    for(i in data)
    {
      $scope.function.push(data[i].name);
    }
  });


  $scope.funParam=[];
  namespaceFactory.getNamespaceDetails($scope.namespace).then(function(data){
    for (i in data.dataSchema){
      $scope.funParam.push(data.dataSchema[i].name);
    }
  });

  $scope.getExprAsText =function(){
    return $scope.fieldData.function+"("+$scope.fieldData.functionparam+")";
  }

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

}]);
