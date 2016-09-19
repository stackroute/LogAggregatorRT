angular.module("tattva")
.controller('CompositeFunctionCtrl',['$scope','$mdDialog','namespaceFactory','fieldData','fieldData2','functionFactory',function($scope,$mdDialog,namespaceFactory,fieldData,fieldData2,functionFactory)
{ 
  fieldData.compositeFunction=undefined;
  functionFactory.getFunction().then(function(data) {
    $scope.compositeFunctionOption=[];
    $scope.compositeFunction=data;
    for(fn in data){
      $scope.compositeFunctionOption.push(data[fn]);
    }
  },

  function(data) {
    $scope.error=data.error;
  });

  $scope.loadParameters = function(index){
    fieldData.functionparameters={};
    for(params in $scope.compositeFunction){
      if($scope.compositeFunction[params].name == fieldData.function){
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
    for(params in fieldData.functionparameters){
      fnParameters.push(fieldData.functionparameters[params]);
    }
  return fieldData.function+"("+fnParameters+")";  // logic for converting the data to human redable easy format of the expression
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
