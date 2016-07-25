angular.module('tattva')
.controller("InstanceCtrl", ["$scope", "$state", "$http", "$stateParams", "$mdDialog", "$mdMedia","namespaceFactory",
function($scope, $state, $http, $stateParams, $mdDialog, $mdMedia, namespaceFactory) {

  $scope.tabTitle = "Recent Data Sources";
  $scope.stateChange = "design.createwatchlist"

  $scope.selectedIndex = 1;
  $scope.submitInstance = function() {
    $state.go('instance.submitInstance');
  }

  namespaceFactory.getNameSpace().then(function(response){$scope.data=response;
    $scope.selectedRow = $scope.data[0].name;
    $state.go("design.instance.viewInstance",{name:$scope.data[0].name});
  });

  $scope.setClickedRow = function(index){  //function that sets the value of selectedRow to current index
    $scope.selectedRow = index;
  }

  $scope.predicate = 'name';
  $scope.reverse = false;
  $scope.order = function(predicate) {
    $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
    $scope.predicate = predicate;
  };

  $scope.status = '';
  $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
  $scope.addInstance = function($event) {
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
    $scope.flag=false;
    $mdDialog.show({
      targetEvent: $event,
      controller: DialogController,
      templateUrl: "design/instances/template/createInstanceDialog.html",
      clickOutsideToClose: false,
      // fullscreen: useFullScreen,
      parent: angular.element(document.body),
      /* scope:{success:'false'}*/
    });

    $scope.$watch(function() {
      return $mdMedia('xs') || $mdMedia('sm');
    }, function(wantsFullScreen) {
      $scope.customFullscreen = (wantsFullScreen === true);
    });

    function DialogController($scope, $state, $mdDialog, $http) {
      namespaceFactory.getNameSpace().then(function(response){  $scope.namespaceSelect=response;});

      $scope.formtype="CREATE";
      $scope.success = false;
      $scope.dInstance = {
        namespace: "",
        name: "",
        ipAddress: "",
        port: "",
        description: "",
        location: ""
      };

      $scope.createMsg = "";
      $scope.instanceSubmit = function() {
        $scope.resError = "";
        $http({
          method: 'POST',
          url: 'instance/createdialogInstance',
          data: $scope.dInstance
        }).then(function(response) {
          var data = {};
          console.log("success");
          // if (data.errors) {
          //     $scope.errorName = data.errors.name;
          //     $scope.errorUserName = data.errors.username;
          //     $scope.errorEmail = data.errors.email;
          // } else {
          $scope.updatedInstance = response.data;
          // $state.go("design.instance.viewInstance.addInstance.created");

          // if(Object.is($scope.updatedInstance,$scope.dInstance))
          // {
          $scope.success = true;
          $scope.createMsg = "Instance Saved Successfully...!";
          // }

          /*  $mdDialog.templateUrl="partials/status.html";*/
          //$state.go('design.instance.addInstance.created');
          /*$scope.hideDialogAfterSuccess=function(){
          $mdDialog.hide();
        }*/

        /* console.dir($state);

        /*if($scope.nspname===null)
        $state.go("design.instance");
        else*/
        // $state.go("design.instance.viewInstance.addInstance({name: '"+$scope.dInstance.namespace+"' })");
        // $scope.flag=true;
      }, function(res){
        $scope.resError = res.data.error;
//        console.log(res.data.error);
      });
    }
    $scope.ok=function(){
      // if($scope.nspname===null)
      $state.go("design.instance");
      // else
      // $state.go("design.instance.viewInstance({name: '"+$scope.dInstance.namespace+"' })");
      $mdDialog.cancel();
    }
    $scope.cancel = function() {
      $mdDialog.cancel();
    }
  }
}
}
]);
