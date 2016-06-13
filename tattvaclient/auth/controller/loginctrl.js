angular.module('tattva')
.controller('LoginCtrl', ['$scope', '$http', '$state','AuthService',
function($scope, $http, $state,AuthService) {
  $scope.signUp=function(){
    $scope.selectedIndex = 1;
  }

  $scope.signIn=function(){
    $scope.selectedIndex = 0;
  }
  $scope.success="true";
  $scope.login = function() {
    $scope.error = "";
    AuthService.signIn($scope.user).then(function(user) {
      $state.go("home");
    }, function(err) {
      $scope.error = err.message;
    });
  }

  $scope.register=function() {
      console.log($scope.user);
    AuthService.signUp($scope.user).then(function(user) {
      $state.go("home");
    }, function(err) {
      $scope.error = err.err;
    });
  }
}]);
