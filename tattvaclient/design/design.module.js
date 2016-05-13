angular.module("tattva").config(['$stateProvider','$urlRouterProvider', function($stateProvider){
  $stateProvider
  .state('design',{
    url: "/design",
    views: {
      "header" : {
        templateUrl: "/home/template/header.html",
        controller: "HeaderCtrl"
      },
      "content@" : {
        templateUrl: "/partials/design.html",
        controller: "orgCtrl"
      },
      "footer" : {
        templateUrl: "/home/template/footer.html"
      }
    }

  })
}]);