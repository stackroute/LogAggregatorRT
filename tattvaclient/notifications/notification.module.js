angular.module("tattva")
.config(['$stateProvider','$urlRouterProvider',
 function($stateProvider){
  $stateProvider
  .state('tattva.notification', {
    url:"/notification",
    views: {      
      "content@" : {
        templateUrl: "/notifications/template/notification.html",
      controller:"notificationCtrl"
      }
    }//end of views of state tattva
  });
}]);
