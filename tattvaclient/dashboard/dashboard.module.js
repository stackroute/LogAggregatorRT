angular.module("tattva").config(['$stateProvider','$urlRouterProvider', function($stateProvider){
  $stateProvider
  .state('home',
  {
    url: "/dashboard/:slidename",
    params: {
      slidename: null
    },
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
