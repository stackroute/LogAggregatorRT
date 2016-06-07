angular.module('tattva')
.controller("viewinstCtrl",["$scope","$state","$http","$stateParams","$mdDialog","$mdMedia","loaddatasources",
function($scope,$state,$http,$stateParams,$mdDialog,$mdMedia, loaddatasources){
  $scope.nspname=$stateParams.name;
  loaddatasources.getdatasources($scope.nspname).then(function(response){$scope.instance=response.data;});
  console.log(($scope.instance) );
  // $scope.loadData = function() {
  //   $http.get("/instance/"+ $scope.nspname).then(function(response){ $scope.instance = response.data;});
  // }
  // $scope.loadData();
  $scope.show="false";

$scope.editEnable=false;
//for first row
$scope.selectedInstanceIndex = undefined;
$scope.selectInstanceIndex = function (index) {
  if ($scope.selectedInstanceIndex !== index) {
    $scope.selectedInstanceIndex = index;
  }
  else {
    $scope.selectedInstanceIndex = undefined;
  }
};

// for second row
// $scope.selectedUserIndex1 = undefined;
// $scope.selectUserIndex1 = function (index) {
//   if ($scope.selectedUserIndex1 !== index) {
//     $scope.selectedUserIndex1 = index;
//   }
//   else {
//     $scope.selectedUserIndex1 = undefined;
//   }
// };

  $scope.dspDetail=function()
  { if($scope.show==="false")
  {
    $scope.show="true";
  }
  else
  {
    $scope.show="false";
  }

}
$scope.edit=function(dsourcename){
console.log(dsourcename);
$http.get('/instance/edit/'+ dsourcename).then(function(response){
$scope.dsdata=response.data;
console.log($scope.dsdata._id);

//mdDialog

$mdDialog.show({
    // targetEvent: $event,
    controller: DialogController,
    templateUrl: "design/instances/template/createInstanceDialog.html",
    clickOutsideToClose: false,
    parent: angular.element(document.body),
    locals:{dsdata:$scope.dsdata}
});
//md-dialog controller

function DialogController($scope, $state, $mdDialog, $http,dsdata) {

    $scope.success = false;
    /*console.log($scope.nspname);*/

    $http.get('/instance').then(function(response) {
        $scope.namespaceSelect = response.data;
    });
     $scope.formtype="EDIT";
    $scope.dInstance = {
        namespace:dsdata.nspname,
        name: dsdata.name,
        ipAddress: dsdata.ipAddress,
        port: dsdata.port,
        description: dsdata.description,
        location: dsdata.location,
        selectedInstance:dsdata.id
    };

    $scope.createMsg = "";
    $scope.instanceSubmit = function() {

        $http({
            method: 'PUT',
            url: 'instance/editdialogInstance',
            data: $scope.dInstance
        }).success(function(response) {
            var data = {};
                $scope.updatedInstance = response.data;
                console.log("---------------",$scope.updatedInstance);
                    // if(Object.is($scope.updatedInstance,$scope.dInstance))
                    // {
                $scope.success = true;
                $scope.createMsg = "Updated successfully..!";

        });
    }




    $scope.cancel = function() {
        $mdDialog.cancel();
    }

}

});


}



}]);
