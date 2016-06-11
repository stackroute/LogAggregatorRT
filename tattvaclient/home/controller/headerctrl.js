angular.module('tattva')
.controller('HeaderCtrl',function($scope,$http,AuthService){

  $scope.userNavItems = AuthService.getUserNavItem();
  console.log($scope.userNavItems.sideNav);
  $scope.user = AuthService.getCurrentUser();

  console.log("Organisation info",$scope.user);
  // $scope.org=AuthService.getCurrentOrg();
  // console.log("header organisation is ",$scope.org);


  $scope.header="TATTVA - CEP";

  $scope.items=$scope.userNavItems.sideNav;
  console.log($scope.items);
});
