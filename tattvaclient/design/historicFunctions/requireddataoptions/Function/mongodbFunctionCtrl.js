angular.module("tattva")
.controller('mongodbFunctionCtrl',['$scope','historicfunctionconfg','fndef','$mdDialog','loadExprData','namespaceFactory','index', function($scope,historicfunctionconfg,fndef,$mdDialog,loadExprData,namespaceFactory,index)
{

  $scope.hide = function() {
    $mdDialog.hide();
  };

  $scope.updateBackPublisher = function() {
    fndef.requiredData[index].function=$scope.inputfunction;
    fndef.requiredData[index].dataFields=$scope.inputfield;
    $mdDialog.hide($scope.fieldData);
  };

  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  
  $scope.DataFieldFunctions=[];

  $scope.DataFieldFunctions= historicfunctionconfg.getfunctionsOption();
  
  $scope.DataField=[];
  if(typeof(fndef.namespace)=="undefined"){
    $scope.DataField=[];
  }
  else{
    namespaceFactory.getNamespaceDetails(fndef.namespace).then(function(data){
     for (i in data.dataSchema){
       $scope.DataField.push(data.dataSchema[i].name);
     }
   })
  }
}]);
