angular.module('tattva')
.controller('editNamespaceCtrl',["$scope","$stateParams","$state","namespaceFactory",
function($scope,$stateParams,$state,namespaceFactory){
  $scope.nameSpaceName = $stateParams.editNamespaceData ;
  console.log($scope.nameSpaceName);
  namespaceFactory.getNamespaceDetails($scope.nameSpaceName).then(function(response){
    $scope.editNameSpace = response;
  });
  $scope.classSelect = function(){
    if($scope.editNamespaceFlag){
       return "editNamespace"
    };
  }
  console.log($scope.editNameSpace);
  $scope.editNamespaceFlag=true;

  $scope.editNamespacetoggle = function(){
    $scope.editNamespaceFlag=false;
  };
  $scope.saveNamespace = function(){
    // namespaceFactory.setNamespaceDetails($scope.editNameSpace)
    // .then(function(response){
      $state.go("design.namespace");
    // })
  }
  $scope.delete = function(index){
    $scope.editNameSpace.dataformat.splice(index,1)
  }
}]);
