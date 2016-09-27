angular.module("tattva")
.controller('historicDataFieldsCtrl',['$scope','fndef','criteria','$mdDialog','loadExprData','namespaceFactory', function($scope,fndef,criteria,$mdDialog,loadExprData,namespaceFactory)
{
 
  $scope.hide = function() {
    $mdDialog.hide();
  };

  $scope.updateBackPublisher = function() {
    criteria.rhs={};
    criteria.rhs.value = $scope.inputfield;
    criteria.rhs.type="Data fields from LogData";
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
