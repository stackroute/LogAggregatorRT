angular.module('tattva')
.controller("watchDialogCtrl",['$scope','$mdDialog','watch','orgSite','adminFactory',
function($scope, $mdDialog, watch, orgSite, adminFactory) {
  $scope.watch = watch;
  $scope.orgSite = orgSite;

  $scope.socket=io();

  $scope.$on('$destroy', function(){
    if($scope.socket){
      $scope.socket.disconnect();
    }
  });

  //console.log("watch details from watchDialogCtrl:",watch);
  //console.log("orgSite from watchDialogCtrl:",orgSite);
  // adminFactory.getWatchlists(orgSite).then(function(res){
  //   console.log("Data are" ,res.data[0]);
  //   $scope.watch=res.data[0];
  // });

  $scope.cancel=function(){
    $mdDialog.cancel();
  }

}]);
