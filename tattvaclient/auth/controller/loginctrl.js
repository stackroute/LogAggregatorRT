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

    AuthService.signIn($scope.user).then(function(user) {
      $state.go("home");
    }, function(err) {
      $scope.error = err.message;
    });
  }

  $scope.register=function() {
    console.log("Trying to register the user ");
    AuthService.signUp($scope.user).then(function(user) {
      console.log("signup successful, navigating to dashboard ", user);
      $state.go("home");
    }, function(err) {
      console.log("Failed to signup..., redirecting back to login..!", err);
      $scope.error = err.message;
    });
  }
}]);
