angular.module("tattva")
.config(['$stateProvider','$urlRouterProvider',
function($stateProvider) {
  $stateProvider
  .state('signin',
  {
    url: "/signin",
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
  }).state('signout',{
    url: "/signout",
    // controller:"SignoutCtrl"
    views: {
      "header" : {
        templateUrl: "/home/template/header.html",
        controller: "HeaderCtrl"
      },
      "content@" : {
        controller:"SignoutCtrl"
      },
      "footer" : {
        templateUrl: "/home/template/footer.html"
      }
    }
  })//end of login state definition
}]);
