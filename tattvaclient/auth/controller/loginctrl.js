angular.module('tattva')
.directive('validPasswordC', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function (viewValue, $scope) {
                var noMatch = viewValue != scope.registerForm.password.$viewValue
                ctrl.$setValidity('noMatch', !noMatch)
            })
        }
    }
})    
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
    $scope.error = " ";
    AuthService.signIn($scope.user).then(function(user) {
      if(user.role=="TATTVAADM"){
        $state.go("adminHome");
      } else {
      $state.go("tattva.home");
      }
    }, function(err) {
      console.log(err.error);
      $scope.error = err.error;
    });
  }
  $scope.register=function() {
    AuthService.signUp($scope.user).then(function(user) {
      $state.go("tattva.home");
    }, function(err) {
      $scope.error = err.err;
    });
  }
}]);
