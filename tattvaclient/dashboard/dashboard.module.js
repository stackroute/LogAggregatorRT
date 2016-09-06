angular.module("tattva").config(['$stateProvider','$urlRouterProvider', function($stateProvider){
  $stateProvider
  .state('tattva.home',
  {
    url: "/dashboard/:slidename",
    params: {
      slidename: null
    },
    views: {
      "content@" : {
        templateUrl: "/dashboard/template/dashboard.html"
      }
    }
  })
  .state('tattva.action', {
    url:"/action",
    views: {
      "content@" : {
        templateUrl: "/home/template/action.html"
      }
    }//end of views of state tattva
  })
}]);
