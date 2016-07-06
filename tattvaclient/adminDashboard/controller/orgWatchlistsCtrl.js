angular.module('tattva')
.controller("orgWatchlistsCtrl",['$scope','$http','$stateParams','adminFactory',
function($scope, $http, $stateParams,adminFactory) {
  var orgSite = $stateParams.orgSite;
  adminFactory.getWatchlists(orgSite).then(function(res){
    // console.log("OrgSite:",orgSite);
    $scope.watches = res.data;
    console.log("org watches:",$scope.watches);
  },function(res){
    $scope.error = res.data.error;
    console.log("Error in getting watches from server error:",res.data.error);
  });
}]);
