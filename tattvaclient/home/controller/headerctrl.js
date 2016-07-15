angular.module('tattva')
.controller('HeaderCtrl',function($scope,$http,AuthService,$mdSidenav){
  $scope.openLeftMenu = function() {
    $mdSidenav('left').toggle();
  };
  AuthService.getUserNavItem().then(function(response){
    $scope.userNavItems = response;
    if($scope.userNavItems)
      $scope.items=$scope.userNavItems.sideNav;
  });
  $scope.user = AuthService.getCurrentUser();
});
