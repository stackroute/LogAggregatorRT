angular.module('tattva')
.controller('HeaderCtrl',function($scope,$http,AuthService){

  $scope.userNavItems = AuthService.getUserNavItem();
  console.log($scope.userNavItems.sideNav);
  $scope.user = AuthService.getCurrentUser();

  $scope.header="TATTVA - CEP";

  $scope.items=$scope.userNavItems.sideNav;
  console.log($scope.items);
});
