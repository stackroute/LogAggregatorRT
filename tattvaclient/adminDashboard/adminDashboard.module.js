angular.module("tattva").config(['$stateProvider', function($stateProvider){
$stateProvider
.state('adminHome',
{
  url: "/admin/dashboard",
  views: {
    "header" : {
      templateUrl: "/home/template/header.html",
      controller: "HeaderCtrl"
    },
    "content" : {
      templateUrl: "adminDashboard/template/adminDashboard.html",
      controller:"adminDashboardCtrl"
      },
    "footer" : {
      templateUrl:"/home/template/footer.html"
    }
  }
})
.state('adminHome.appPortfolio',
{
  url:'/',
  templateUrl:"adminDashboard/template/appPortfolio.html",
  controller:"appPortfolioCtrl"
})
.state('adminHome.orgwatches',
{
  url: "/org/:orgSite:namespace:instance:stream:watchlist",
  templateUrl:"adminDashboard/template/orgportfolio.html",
  controller: "orgWatchlistsCtrl",
  // resolve:{
  //   // selectionObj:selectionObject()
  // }
  // templateUrl:"adminDashboard/template/orgportfolio.html",
  // controller:"adminDashboardController.js"
});
// $rootScope.$on
// $urlRouterProvider.otherwise('/adminHome.orgportfolio');
}]);


// .state({
//   name:'adminHome',
//   url: "/admin/dashboard",
//   views:{
//     "header" : {
//       templateUrl: "/home/template/header.html",
//       controller: "HeaderCtrl"
//     },
//     "content" : {
//       templateUrl: "adminDashboard/template/adminDashboard.html"
//       },
//     "footer" : {
//       templateUrl:"/home/template/footer.html"
//       }
//     }
//   });
