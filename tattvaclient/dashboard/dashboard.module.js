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
        templateUrl: "/dashboard/template/dashboardslidea.html"
      },
      "footer" : {
        templateUrl: "/home/template/footer.html"
      }
    }
  })
  .state('SlideA',
  {
    url: "/slidea",
    views: {
      "header" : {
        templateUrl: "/home/template/header.html",
        controller: "HeaderCtrl"
      },
      "content@" : {
        templateUrl: "/dashboard/template/dashboardslidea.html"
      },
      "footer" : {
        templateUrl: "/home/template/footer.html"
      }
    }
  })
   .state('SlideB',
    {
      url: "/slideb",
      views: {
        "header" : {
          templateUrl: "/home/template/header.html",
          controller: "HeaderCtrl"
        },
        "content@" : {
          templateUrl: "/dashboard/template/dashboardslideb.html"
        },
        "footer" : {
          templateUrl: "/home/template/footer.html"
        }
      }
    })
}]);
