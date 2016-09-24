angular.module('tattva')
.controller('notificationCtrl',function($rootScope,$scope,$mdPanel){
	
	// AuthService.getUserNavItem().then(function(response){
 //    	$scope.userNavItems = response;
 //    });
	$scope.notify = $rootScope.notify;
//	console.log($scope.notify.length);
	// $rootScope.socket1 = io('/notified');
	// $rootScope.socket1.on('notification',function(msg){
	// 	console.log(msg);
	// 	//$scope.notify.push(msg);
	// });
	
	// notificationFactory.getNotificationItems().then(function(res){
	// 	$scope.notify = res;
	// 	AuthService.getUserNavItem().then(function(response){
 //    	$scope.userNavItems = response;
 //    });
	// console.log("on success");  
	// },function (res) {
	// 	$scope.notifyerror = res; 
	// 	//console.log("on error");  
	// });
	//pagination
	// $scope.showDialog = function() {
 // //    notificationFactory.getNotificationItems().then(function(res){
	// // 	$scope.notify=$scope.notify.concat(res);
	// // //console.log("on success");  
	// // });
 //  };
});