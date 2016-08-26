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
  .state('action', {
    url:"/action",
    views: {
      "header" : {
        templateUrl: "/home/template/header.html",
        controller: "HeaderCtrl"
      },
      "content" : {
        templateUrl: "/home/template/action.html"
      },
      "footer" : {
        templateUrl: "/home/template/footer.html"
      }
    }//end of views of state tattva
  })
  // .state('notification', {
  //   url:"/notification",
  //   views: {
  //     "header" : {
  //       templateUrl: "/home/template/header.html",
  //       controller: "HeaderCtrl"
  //     },
  //     "content" : {
  //       templateUrl: "/notification/template/notification.html"
  //     },
  //     "footer" : {
  //       templateUrl: "/home/template/footer.html"
  //     }
  //   }//end of views of state tattva
  // });
}]);
