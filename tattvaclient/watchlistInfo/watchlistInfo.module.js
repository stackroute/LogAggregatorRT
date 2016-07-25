angular.module("tattva").config(['$stateProvider','$urlRouterProvider', function($stateProvider){
$stateProvider
.state('orgwatch',
{
  url: "/admin/org/:orgsite/watch/:watchlist",
  // params: {
  //   orgsite:null,
  //   watchlist: null
  // },
  views: {
    "header" : {
      templateUrl: "/home/template/header.html",
      controller: "HeaderCtrl"
    },
    "content" : {
      templateUrl: "watchlistInfo/template/orgportfolio.html"
      },
    "footer" : {
      templateUrl: "/home/template/footer.html"
        }
  }
})
}]);
