angular.module("tattva").config(['$stateProvider','$urlRouterProvider', function($stateProvider){
  $stateProvider
  .state('user',
  {
    url: "/dashboard",
    views: {
      "header" : {
        templateUrl: "/partials/header.html",
        controller: "headerCtrl"
      },
      "content@" : {
        templateUrl: "/dashboard/template/dashboard.html"
      },
      "footer" : {
        templateUrl: "/partials/footer.html"
      }
    }
  })
}]);
