angular.module('tattva')
.controller("ViewInstanceCtrl", ["$rootScope","$scope", "$state", "$http", "$stateParams", "$mdDialog", "$mdMedia", "LoadDataSources",
function($rootScope,$scope, $state, $http, $stateParams, $mdDialog, $mdMedia, LoadDataSources) {
  $scope.flag=false;
  $scope.nspname = $stateParams.name;
  LoadDataSources.getdatasources($scope.nspname).then(function(response) {
    $scope.instance = response.data;
  });
// console.log($scope.instance);
  $scope.show = "false";
  $scope.editEnable = false;
  //for first row
  $scope.selectedInstanceIndex = undefined;

  $scope.selectInstanceIndex = function(index) {
    if ($scope.selectedInstanceIndex !== index) {
      $scope.selectedInstanceIndex = index;
    } else {
      $scope.selectedInstanceIndex = undefined;
    }
  };

  $scope.dspDetail = function() {
    if ($scope.show === "false") {
      $scope.show = "true";
    } else {
      $scope.show = "false";
    }
  }

  $scope.edit = function(dsourcename) {
    $scope.flag=true;
    $http.get('/instance/edit/' + dsourcename).then(function(response) {
      $scope.dsdata = response.data;
      //mdDialog
      $mdDialog.show({
        // targetEvent: $event,
        controller: DialogController,
        templateUrl: "design/instances/template/createInstanceDialog.html",
        clickOutsideToClose: false,
        parent: angular.element(document.body),
        locals: {
          dsdata: $scope.dsdata,
          nspname:$scope.nspname,
          flag:$scope.flag
        }
      });
      //md-dialog controller

      function DialogController($scope, $state, $mdDialog, $http, dsdata, nspname,flag) {
        console.log(flag);
        $scope.success = false;
        $http.get('/instance').then(function(response) {
          $scope.namespaceSelect = response.data;
        },function(response){
          $scope.resError = response.data.error;
        });
        $scope.formtype = "EDIT";
        $scope.dInstance = {
          namespace: dsdata.nspname,
          name: dsdata.name,
          ipAddress: dsdata.ipAddress,
          port: dsdata.port,
          description: dsdata.description,
          location: dsdata.location,
          selectedInstance: dsdata.id
        };
        $scope.createMsg = "";
        $scope.instanceSubmit = function() {
          $http({
            method: 'PUT',
            url: 'instance/editdialogInstance',
            data: $scope.dInstance
          }).then(function(response) {
            var data = {};
            //console.log(response.data);
            var arr=[];
            arr.push(response.data.editedBy);
            arr.push("updated an instance");
            arr.push(response.data.name);
            arr.push("on");
            arr.push(moment().startOf(response.data.editedOn).format('MMMM Do YYYY, h:mm:ss a'));
            //console.log(arr);
            $rootScope.socket1.emit('notification',arr);
            $scope.updatedInstance = response.data;
            $scope.success = true;
            $scope.createMsg = "Updated successfully..!";
          },function(response){
            $scope.resError = response.data.error;
          });
        }
        $scope.cancel = function() {
          $mdDialog.cancel();
        }
        $scope.ok=function(){
          $mdDialog.cancel();
        }
      }
    },function(response){
      //get instance error
      $scope.resError = response.data.error;
    });
  }
}
]);
