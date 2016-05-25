angular.module('tattva')
.controller("createNamespaceCtrl",["$scope","$state","$http","$mdDialog","$mdToast", "namespaceFactory",
function($scope, $state, $http, $mdDialog,$mdToast, namespaceFactory){
  $scope.nameSpace = {
    name:"",
    description:"",
    dataSchema: [{_id:0,fieldType:"dimension",fieldAlias:"",fieldName:"" }]
  };

  $scope.deleteDataFormat = function(index){
    console.log($scope.nameSpace.dataSchema);
    $scope.nameSpace.dataSchema.splice(index,1);
  }

  $scope.addDataFormat = function(){
    var id = $scope.nameSpace.dataSchema.length;
    $scope.nameSpace.dataSchema.push({_id:id, fieldType:"dimension",fieldAlias:"",fieldName:"" });
  }

  $scope.createNamespaceSubmit = function(){
    console.log($scope.nameSpace.dataSchema);
    namespaceFactory.saveNameSpace($scope.nameSpace);
    $state.go("design.namespace");
  }

  $scope.createNamespaceCancel = function(){
    $state.go("design.namespace");
  }
}]);
