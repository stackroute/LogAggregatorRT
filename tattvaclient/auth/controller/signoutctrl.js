angular.module('tattva')
.controller('SignoutCtrl', ['$scope', '$state', 'AuthService',
function($scope, $state, AuthService) {

  AuthService.signout()
  .then(function(res){
    $state.go("tattva");
  },
  function(res){
    $state.go("signin");
    // , {error: "Invalid signin attempt, please retry with valid credentials"});
  });


}]);
