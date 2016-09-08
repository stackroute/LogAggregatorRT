angular.module("tattva")
.controller('historicDataFieldCtrl',['$scope','$stateParams','fndef','field','$mdDialog','namespaceFactory', function($scope,$stateParams,fndef,field,$mdDialog,namespaceFactory)
{
  if ($stateParams.edithistoricfunctiondata) {
    $mdDialog.hide();
  }
  $scope.hide = function() {
    $mdDialog.hide();
  };

  $scope.updateBackPublisher = function() {
    field.dataFields=$scope.inputfield;
    field.type="Data fields from LogData";
    $mdDialog.hide();
  };

  $scope.cancel = function() {
    $mdDialog.cancel();
  };

  $scope.DataField=[];
  if(typeof(fndef.namespace)=="undefined"){
    $scope.DataField=[];
  }
  else{
    namespaceFactory.getNamespaceDetails(fndef.namespace).then(function(data){
      for (i in data.dataSchema){
        $scope.DataField.push(data.dataSchema[i].name)
      }
    })
  }
}]);
