angular.module('tattva')
.controller("orgWatchlistsCtrl",['$scope','$http','$stateParams', function($scope, $http, $stateParams) {
  console.log("  orgSite(from orgWatchlistsController):",$stateParams.orgSite);
}]);
