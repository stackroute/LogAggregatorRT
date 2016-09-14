angular.module("tattva")
.controller('CompositeFunctionCtrl',['$scope','$mdDialog','namespaceFactory','fieldData','fieldData2','functionFactory',function($scope,$mdDialog,namespaceFactory,fieldData,fieldData2,functionFactory)
{ 
  fieldData.compositeFunction=undefined;
  functionFactory.getFunction().then(function(data) {
    $scope.compositeFunctionOption=[];
    $scope.compositeFunction=data;
    for(fnname in data){
      $scope.compositeFunctionOption.push(data[fnname].name);
    }
  },

  function(data) {
    $scope.error=data.error;
  });

  $scope.loadParameters = function(){
    fieldData.compositeFunctionOperands={};
    for(params in $scope.compositeFunction){
      if($scope.compositeFunction[params].name == fieldData.compositeFunction){
        $scope.params=$scope.compositeFunction[params].parameters;
      }
    }
  }

  namespaceFactory.getNamespaceDetails(fieldData2.namespace).then(function(data){
    $scope.datafields=[];
    for (i in data.dataSchema){
      $scope.datafields.push(data.dataSchema[i].name);
    }
  })

  $scope.getExprAsText =function(){
    var fnParameters = [];
    for(params in fieldData.compositeFunctionOperands){
      fnParameters.push(fieldData.compositeFunctionOperands[params]);
    }
  return fieldData.compositeFunction+"("+fnParameters+")";  // logic for converting the data to human redable easy format of the expression
}

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

}]);
