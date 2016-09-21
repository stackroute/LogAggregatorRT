angular.module("tattva")
.config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider){
  $stateProvider
  .state('design',{
    url: "/design",
    views: {
      "header" : {
        templateUrl: "/home/template/header.html",
        controller: "HeaderCtrl"
      },
      "content@" : {
        templateUrl: "/design/designhome/template/designhome.html",
        controller: "designController"
      },
      "footer" : {
        templateUrl: "/home/template/footer.html"
      }
    }
  })
  .state('design.summary',{
    url: "/summary",
    templateUrl: "/design/designhome/template/designsummary.html",
    controller: "summaryController"
  })
}]);
