angular.module('tattva')
.controller('SignoutCtrl', ['$rootScope','$scope', '$state', 'AuthService',
function($rootScope,$scope, $state, AuthService) {

  AuthService.signout()
  .then(function(res){
  	$rootScope.notifyindicator=false;
  	$rootScope.socket1.disconnect();
    $state.go("tattva");
  },
  function(res){
    $state.go("signin");
    // , {error: "Invalid signin attempt, please retry with valid credentials"});
  });
}]);
