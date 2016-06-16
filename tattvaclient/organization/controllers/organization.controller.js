angular.module('tattva')
.controller('orgCtrl',['$scope','$mdDialog','$http','AuthService','userservice', function($scope, $mdDialog, $http,AuthService, userservice) {
  $scope.org = AuthService.getCurrentUser();

  $scope.loadData = function() {
    userservice.getUserName().then(function(response){ $scope.user = response;
     });
  }
  $scope.loadData();
}]);
