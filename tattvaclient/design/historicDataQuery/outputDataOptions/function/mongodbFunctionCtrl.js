angular.module("tattva")
.controller('mongodbFunctionCtrl',['$scope','$stateParams','historicQueryConfg','fndef','$mdDialog','namespaceFactory','field', function($scope,$stateParams,historicQueryConfg,fndef,$mdDialog,namespaceFactory,field)
{ 

  $scope.hide = function() {
    $mdDialog.hide();
  };

  $scope.updateBackPublisher = function() {
    field.function=$scope.inputfunction;
    field.dataFields=$scope.inputfield;
    field.type="Aggregate Function";
    $mdDialog.hide();
  };

  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.DataFieldFunctions=[];

  $scope.DataFieldFunctions= historicQueryConfg.getFunctionsOption();
  
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
