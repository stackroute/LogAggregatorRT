angular.module('tattva')
.controller("viewinstCtrl",["$scope","$state","$http","$stateParams","$mdDialog","$mdMedia",function($scope,$state,$http,$stateParams,$mdDialog,$mdMedia){
  $scope.nspname=$stateParams.name;
  $scope.loadData = function() {
    $http.get("/data/"+ $scope.nspname).then(function(response){ $scope.instance = response.data;});
  }
  $scope.loadData();
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

}]);
