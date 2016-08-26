angular.module('tattva')
.controller('notificationCtrl',function($scope,notificationFactory,AuthService,$mdPanel){
	
	AuthService.getUserNavItem().then(function(response){
    	$scope.userNavItems = response;
    });
	
	notificationFactory.getNotificationItems().then(function(res){
		$scope.notify = res;
		AuthService.getUserNavItem().then(function(response){
    	$scope.userNavItems = response;
    });
	//console.log("on success");  
	},function (res) {
		$scope.notifyerror = res; 
		//console.log("on error");  
	});
	//pagination
	$scope.showDialog = function() {
    notificationFactory.getNotificationItems().then(function(res){
		$scope.notify=$scope.notify.concat(res);
	//console.log("on success");  
	});
  };
});