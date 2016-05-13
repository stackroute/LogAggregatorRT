angular.module("tattva")
.config(['$stateProvider','$urlRouterProvider',
function($stateProvider, $urlRouterProvider){
  $stateProvider
  .state('design.watchlist', {
    url:'/watchlist',
    templateUrl:'/watchlists/template/watchlists.html',
    controller: 'WatchListCtrl'
  })
  //
  //
  // .state('design.watchlist.publish',
  // {
  //   url: "/publish",
  //   controller: "publishCtrl"
  // })
  .state('design.watchlist.create', {
    url:'/new',
    views: {
      "header" : {
        templateUrl: "/home/template/header.html",
        controller: "HeaderCtrl"
      },
      "content@" : {
        templateUrl:'/watchlists/template/newwatchlist.html',
        controller: 'WatchListCtrl'
      },
      "footer" : {
        templateUrl: "/home/template/footer.html"
      }
    }
  })
}]);
