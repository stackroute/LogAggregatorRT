angular.module("tattva").config(['$stateProvider','$urlRouterProvider', function($stateProvider){
  $stateProvider
  .state('user',
  {
    url: "/dashboard",
    views: {
      "header" : {
        templateUrl: "/home/template/header.html",
        controller: "HeaderCtrl"
      },
      "content@" : {
        templateUrl: "/dashboard/template/dashboard.html"
      },
      "footer" : {
        templateUrl: "/home/template/footer.html"
      }
    }
  })
}]);
