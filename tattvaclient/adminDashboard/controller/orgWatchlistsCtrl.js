angular.module('tattva')
.controller("orgWatchlistsCtrl",['$scope','$http','$stateParams','$mdDialog','adminFactory',
function($scope, $http, $stateParams,$mdDialog,adminFactory) {
  var orgSite = $stateParams.orgSite;

  adminFactory.getWatchlists(orgSite).then(function(res){
    // console.log("OrgSite:",orgSite);
    //console.log("response:",res);
    $scope.watches = res.data;
     console.log("org watches res:",res.data);
  },function(res){
    $scope.error = res.data.error;
    console.log("Error in getting watches from server error:",res.data.error);
  });

  $scope.appClick = function(ev,watch){
    console.log("inside click function");
      $mdDialog.show({
        controller: "watchDialogCtrl",
        templateUrl:'adminDashboard/template/watchDialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        locals:{watch:watch,orgSite:orgSite},
        escapeToClose:true,
        fullscreen: true
      });
  };
}]);
