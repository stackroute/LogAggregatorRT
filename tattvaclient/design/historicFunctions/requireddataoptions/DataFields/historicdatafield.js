angular.module("tattva")
.controller('requiredDataFieldCtrl',['$scope','fndef','index','$mdDialog','loadExprData','namespaceFactory', function($scope,fndef,index,$mdDialog,loadExprData,namespaceFactory)
{
 
  $scope.hide = function() {
    $mdDialog.hide();
  };

  $scope.updateBackPublisher = function() {
    fndef.requiredData[index].dataFields=$scope.inputfield;
    $mdDialog.hide($scope.fieldData);
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
