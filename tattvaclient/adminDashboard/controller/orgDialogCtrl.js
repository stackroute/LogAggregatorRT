angular.module('tattva')
.controller("orgDialogCtrl",['$scope','orgSite','$stateParams', function($scope, orgSite, $stateParams) {
      $scope.orgSite = orgSite;
  }]);
