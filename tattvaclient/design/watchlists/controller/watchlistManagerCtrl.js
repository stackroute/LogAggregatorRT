angular.module("tattva")
.controller("watchlistManagerCtrl",["$scope","$mdDialog","data",'saveToDB',"$state", function($scope,$mdDialog,data,saveToDB,$state){
  $scope.cancel = function() {
    data.status="inactive";
    $state.go('design.watchlist');
    $mdDialog.cancel();
  };
  $scope.watchlistName=data.name;

  $scope.updateBackPublisher=function(){
    data.status="active";
    saveToDB.savewatchloopdata(data);
    $state.go('tattva.home');
    $mdDialog.hide();
  }

  $scope.hide = function() {
    $mdDialog.hide();
  };

}])
