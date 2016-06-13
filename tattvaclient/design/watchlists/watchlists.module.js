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
    url:'/detailview/:watchlistName',
    templateUrl: "design/watchlists/template/createWatchlist.html",
    controller: 'WatchListCtrl',
    resolve:{
      selectedWlstdef:function(loadExprData, $stateParams){
        return loadExprData.getWatchlistData($stateParams.watchlistName).then(function(response){
          console.log(response);
          return response;
        });
      }
    }
  })
  .state('design.createwatchlist',
  {
    url: '/new',
    templateUrl: "design/watchlists/template/createWatchlist.html",
    controller: 'WatchListCtrl',
    resolve:{
      selectedWlstdef:function(){
        return undefined;
      }
    }
  })

}]);
