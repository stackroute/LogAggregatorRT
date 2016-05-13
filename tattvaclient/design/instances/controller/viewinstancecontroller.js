angular.module('tattva')
.controller("viewinstCtrl",["$scope","$state","$http","$stateParams","$mdDialog","$mdMedia",function($scope,$state,$http,$stateParams,$mdDialog,$mdMedia){
  $scope.nspname=$stateParams.name;
  $scope.loadData = function() {
    $http.get("/data/"+ $scope.nspname).then(function(response){ $scope.instance = response.data;});
  }
  $scope.loadData();
  $scope.show="false";

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