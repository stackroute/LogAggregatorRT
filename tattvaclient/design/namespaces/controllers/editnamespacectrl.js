angular.module('tattva')
.controller('editNamespaceCtrl',["$scope","$stateParams","$state","namespaceFactory",
function($scope,$stateParams,$state,namespaceFactory){
  $scope.nameSpaceName = $stateParams.editNamespaceData ;
  namespaceFactory.getNamespaceDetails($scope.nameSpaceName).then(function(response){
    $scope.editNameSpace = response;
  });
  $scope.editNamespaceFlag=true;

  $scope.classSelect = function(){
    if($scope.editNamespaceFlag){
       return "editNamespace"
    };
  }

  $scope.editNamespacetoggle = function(){
    $scope.editNamespaceFlag=false;
  };

  $scope.saveNamespace = function(){
    var result = false;
    var result = namespaceFactory.setNamespaceDetails($scope.editNameSpace, $scope.nameSpaceName );
    if(result){
      $state.go("design.namespace");
    }
  }

  $scope.delete = function(index){
    $scope.editNameSpace.dataformat.splice(index,1)
  }

  $scope.addDataFormat = function(){
    var id = $scope.editNameSpace.dataformat.length;
    $scope.editNameSpace.dataformat.push({_id:id, fieldType:"dimension",fieldAlias:"",fieldName:"" });
    console.log($scope.editNameSpace);
  }
}]);
