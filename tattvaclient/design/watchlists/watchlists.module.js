angular.module('tattva')
  .config(['$stateProvider','$urlRouterProvider',
  function($stateProvider){
    $stateProvider
    .state('design.watchlist',
    {
      url:'/watchlist',
      templateUrl: "/design/watchlists/template/watchlistNamespaceBasedView.html"
    })
    .state('design.watchlist.viewwatchlist',
    {
      url:'/:namespaceobject',
      templateUrl: "design/watchlists/template/viewwatchlist.html",
      controller: 'watchlistviewctrl'
    })
    .state('design.viewdata',
    {
      url:'/detailview/:watchlistobject',
      templateUrl: "design/watchlists/template/watchlistDetailedView.html",
      controller: 'editWatchlistCtrl'
    })
    .state('design.createwatchlist',
    {
      url: '/new',
      templateUrl: "design/watchlists/template/createWatchlist.html",
      controller: 'WatchListCtrl'
  })
}]);
