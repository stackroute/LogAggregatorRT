angular.module('tattva')
  .config(['$stateProvider','$urlRouterProvider',
  function($stateProvider){
    $stateProvider
    .state('design.watchlist',
    {
      url:'/displayWatchList',
      templateUrl: "/design/watchlists/template/namespacebasedwatchlist.html"
    })
    .state('design.watchlist.viewwatchlist',
    {
      url:'/:namespaceobject',
      templateUrl: "design/watchlists/template/watchlistView.html",
      controller: 'watchlistviewctrl'
    })
    .state('design.viewdata',
    {
      url:'detailview/:watchlistobject',
      templateUrl: "design/watchlists/template/watchlistsdetailview.html",
      controller: 'watchlistsdetailviewCtrl'
    })
    .state('design.createwatchlist',
    {
      url: '/createwatchlist',
      templateUrl: "design/watchlists/template/newwatchlist.html",
      controller: 'WatchListCtrl'
  })
}]);
