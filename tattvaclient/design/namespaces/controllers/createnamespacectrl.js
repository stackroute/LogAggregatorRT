angular.module('tattva')
.controller("createNamespaceCtrl",["$scope","$state","$http","$mdDialog","$mdToast", "namespaceFactory","$stateParams",
function($scope, $state, $http, $mdDialog,$mdToast, namespaceFactory, $stateParams){

  $scope.temp = $scope.uploadJSONText;
  $scope.uploadJSONFlag = false;
  $scope.editData=undefined;

  $scope.nameSpace = {
    dataSchema: [{type:"dimension"}]
  };

  $scope.editNamespaceFlag = true;
  if($stateParams.editNamespaceData){
    $scope.editData = $stateParams.editNamespaceData;
    namespaceFactory.getNamespaceDetails($scope.editData).then(function(response){
      $scope.nameSpace = response;
    });
  };

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
    if($stateParams.editNamespaceData){//edit namespace page - save button
      var result = false;
      if ($scope.createNameSpace.$dirty) {//if form elements are changed in edit page
        if($scope.createNameSpace.$valid){
          var confirm = $mdDialog.confirm()
          .title('Are you sure you want to change namespace '+$scope.nameSpace.name +"?")
          .ariaLabel('Namespace changed')
          .targetEvent(ev)
          .ok('Yes')
          .cancel('No');
          $mdDialog.show(confirm).then(function() {
            var result = namespaceFactory.setNamespaceDetails($scope.nameSpace, $scope.nameSpaceName );
            if(result){
              $scope.editNamespaceFlag=true;
              $scope.editData=undefined;
              $scope.showAlert(ev, "Namespace edited successfully!");
            }
            else{
              //namespace update is not successful
            }
            $state.go("design.namespace")
          }, function() {
            // $state.go("design.createNamespace")
          });
        }
        else{
          //changes are not valid
        }
      }
      else{
        //no changes made yet
        var confirm = $mdDialog.confirm()
        .title('You made no changes in the form? Continue?')
        .ariaLabel('Namespace not changed')
        .targetEvent(ev)
        .ok('Yes')
        .cancel('No');
        $mdDialog.show(confirm).then(function() {
          $state.go("design.namespace")
        }, function() {
          // $state.go("design.createNamespace")
        });
      }
    }
    else{//create namespace page  - save function
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
        // var result = false;
        var result = namespaceFactory.saveNameSpace($scope.nameSpace)
        console.log(result);
        if(result){
          $scope.showAlert(ev, "Namespace saved successfully!");
        }
      }
      else{
        //form changes are not valid
      }
    }
  }

  $scope.showConfirm = function(ev) {
    $state.go("design.namespace")
  };

  $scope.showAlert = function(ev, dialougeText) {
    $mdDialog.show(
      $mdDialog.alert()
      .parent(angular.element(document.querySelector('#popupContainer')))
      .clickOutsideToClose(true)
      .title(dialougeText)
      .ariaLabel('Namespace updated.')
      .ok('Ok')
      .targetEvent(ev)
    );
    $state.go("design.namespace")
  };


  $scope.createNamespaceCancel = function(){
    $state.go("design.namespace");
  }

  $scope.uploadJSON = function(inputJSONText){
    var outputJSONText = JSON.parse(inputJSONText);
    $scope.nameSpace.dataSchema = namespaceFactory.getJSONObject(inputJSONText)
    $scope.uploadJSONFlag = false;
  }


  $scope.uploadJSONFlagToggle = function(){
    if($scope.uploadJSONFlag)
    $scope.uploadJSONFlag = false;
    else
    $scope.uploadJSONFlag = true;
  }

}]);
