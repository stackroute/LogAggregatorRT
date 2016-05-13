angular.module("tattva")
.config(['$stateProvider','$urlRouterProvider',
function($stateProvider) {
  $stateProvider
  .state('login',
  {
    url: "/login",
    views: {
      "header" : {
        templateUrl: "/home/template/header.html",
        controller: "HeaderCtrl"
      },
      "content@" : {
        templateUrl: "/auth/template/login.html",
        controller:'LoginCtrl'
      },
      "footer" : {
        templateUrl: "/home/template/footer.html"
      }
    }
  })//end of login state definition
}]);
