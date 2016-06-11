angular.module('tattva')
.controller("createNamespaceCtrl",["$scope","$state","$http","$mdDialog","$mdToast", "namespaceFactory","$stateParams",
function($scope, $state, $http, $mdDialog,$mdToast, namespaceFactory, $stateParams){
  $scope.nameSpace = {
    dataSchema: [{type:"dimension"}]
  };

  if($stateParams.editNamespaceData){
    namespaceFactory.getNamespaceDetails($stateParams.editNamespaceData).then(function(response){
      $scope.nameSpace = response;
      console.log("$scope.nameSpace =  = = = =", $scope.nameSpace);
    });
  }
  $scope.uploadJSONFlag = false;

  $scope.deleteDataFormat = function(index){
    $scope.nameSpace.dataSchema.splice(index,1);
  }

  $scope.addDataFormat = function(){
    var id = $scope.nameSpace.dataSchema.length;
    $scope.nameSpace.dataSchema.push({type:"dimension"});
  }

  $scope.editNamespacetoggle = function(){
    $scope.editNamespaceFlag=false;
  };

  $scope.createNamespaceSubmit = function(ev){
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
      // $state.go("design.namespace");
      var result = false;
      var result = namespaceFactory.saveNameSpace($scope.nameSpace)
      if(result){
        $scope.showAlert(ev, "Namespace saved successfully!");
      }
    }
  }

  $scope.saveNamespace = function(ev){
    var result = false;
    var result = namespaceFactory.setNamespaceDetails($scope.nameSpace, $scope.nameSpaceName );
    if(result){
      // $state.go("design.namespace");
      $scope.editNamespaceFlag=true;
      $scope.editData=undefined;
      $scope.showAlert(ev, "Namespace edited successfully!");
    }
  }

  $scope.showConfirm = function(ev) {
    var confirm = $mdDialog.confirm()
    .title('Are you sure you want to cancel it?')
    .ariaLabel('Namespace saved')
    .targetEvent(ev)
    .ok('Yes')
    .cancel('No');
    $mdDialog.show(confirm).then(function() {
      $state.go("design.namespace")
    }, function() {
      // $state.go("design.createNamespace")
    });
  };

  $scope.showAlert = function(ev, dialougeText) {
    var confirm = $mdDialog.confirm()
    .title(dialougeText)
    .ariaLabel('Namespace Updated')
    .targetEvent(ev)
    .ok('Ok')
    // .cancel('No');
    $mdDialog.show(confirm).then(function() {
      $state.go("design.namespace")
    }, function() {
      // $state.go("design.createNamespace")
    });
  };

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
