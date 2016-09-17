angular.module('tattva')
.controller('HeaderCtrl',function($scope,$http,AuthService,$mdSidenav,$rootScope){

	$scope.openLeftMenu = function() {
		$mdSidenav('left').toggle();
	};
	$scope.onchange=function(name){
		$rootScope.$emit("index",{sname:name});
	}

	AuthService.getUserNavItem().then(function(response){
		$scope.userNavItems = response;
//making notification icon hide when user is not sign in
$scope.displayTopNavIcon=false;
if($scope.userNavItems)
{
	$scope.items=$scope.userNavItems.sideNav;
      //making notification icon visible when user is signed in
      if($scope.userNavItems.topNav[0].link == "signout") 
      	$scope.displayTopNavIcon=true;
  }
});
	$scope.user = AuthService.getCurrentUser();
	//console.log($scope.user.role);
});