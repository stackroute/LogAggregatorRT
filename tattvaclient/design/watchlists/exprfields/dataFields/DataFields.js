angular.module("tattva")
.controller('DataFieldsCtrl',['$scope','$mdDialog','fieldData','fieldData2','loadExprData',function($scope,$mdDialog,fieldData,fieldData2,loadExprData)
{
$scope.$watch('myvar',function(){console.log($scope.myvar)});
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
//@Todo
  $scope.getExprAsText=function() {
    return "DataField("+$scope.fieldData.DataField+")";
  }

  $scope.DataField=[];
  loadExprData.getDataFields(fieldData2.namespace).then(function(response){var data=response.data;
  return data
  }).then(function(data){
  for(i in data.dataformat)
  $scope.DataField.push(data.dataformat[i].fieldName);
  })

}]);
