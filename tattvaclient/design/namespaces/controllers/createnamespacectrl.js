angular.module('tattva')
.controller("createNamespaceCtrl",["$scope","$state","$http","$mdDialog","$mdToast", "namespaceFactory",
function($scope, $state, $http, $mdDialog,$mdToast, namespaceFactory){
  $scope.nameSpace = {
    dataSchema: [{type:"dimension"}]
  };
  $scope.uploadJSONFlag = false;

  $scope.deleteDataFormat = function(index){
    $scope.nameSpace.dataSchema.splice(index,1);
  }

  $scope.addDataFormat = function(){
    var id = $scope.nameSpace.dataSchema.length;
    $scope.nameSpace.dataSchema.push({type:"dimension"});
  }

  $scope.createNamespaceSubmit = function(){
    var timestamp = Date.now()
    $scope.nameSpace.createdOn =timestamp;
    $scope.nameSpace.editedOn = timestamp;
    $scope.nameSpace.editedBy = "userName";
    $scope.nameSpace.createdBy = "userName";
    $scope.nameSpace.organisation = "Wipro";
    $scope.nameSpace.status = "active";
    $scope.nameSpace.tag = $scope.nameSpace.name+"123";
    if (!$scope.nameSpace.dataSchema.length){
      $scope.nameSpace.dataSchema.push({type:"dimension"});
    }
    if ($scope.createNameSpace.$valid){
      namespaceFactory.saveNameSpace($scope.nameSpace);
      $state.go("design.namespace");
    }
  }

  $scope.createNamespaceCancel = function(){
    $state.go("design.namespace");
  }

  $scope.uploadJSON = function(inputJSONText){
    var outputJSONText = JSON.parse(inputJSONText);
    $scope.nameSpace.dataSchema = namespaceFactory.getJSONObject(inputJSONText)
    $scope.uploadJSONFlag = false;
  }

  $scope.temp = $scope.uploadJSONText;

  $scope.uploadJSONFlagToggle = function(){
    if($scope.uploadJSONFlag)
    $scope.uploadJSONFlag = false;
    else
    $scope.uploadJSONFlag = true;
  }
  $scope.showConfirm = function(ev) {
      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.confirm()
            .title('Are you sure you want to cancel it')
            .ariaLabel('Lucky day')
            .targetEvent(ev)
            .ok('Yes')
            .cancel('No');
      $mdDialog.show(confirm).then(function() {
        $state.go("design.namespace")
      }, function() {
        $state.go("design.createNamespace")
      });
    };


}]);
