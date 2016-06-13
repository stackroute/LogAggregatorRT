angular.module("tattva")
.controller('FunctionCtrl',['$scope','$mdDialog','fieldData','loadExprData',function($scope,$mdDialog,fieldData,loadExprData)
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



  $scope.funParam=[];
  loadExprData.getNameSpacenames().then(function(result)
  {
    console.log("namespace \n requested \n now");
    console.log(result);
    for(i in result)
    {
      console.log(result);
      $scope.funParam.push(result[i]);
    }
    console.log($scope.funParam);
  });

  $scope.getExprAsText =function(){
    return $scope.fieldData.function+"("+$scope.fieldData.functionparam+")";
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

}]);
