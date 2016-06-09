angular.module("tattva")
.controller("watchlistManagerCtrl",["$scope","$mdDialog","data",'saveToDB', function($scope,$mdDialog,data,saveToDB){
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
$scope.watchlistName=data.name;

$scope.updateBackPublisher=function(){
    saveToDB.savewatchloopdata(data);

  $mdDialog.hide();
}

$scope.hide = function() {
  $mdDialog.hide();
};

}])
