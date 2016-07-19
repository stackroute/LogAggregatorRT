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
  url:"/org/:orgSite",
  templateUrl:"adminDashboard/template/orgportfolio.html",
  controller: "orgWatchlistsCtrl",
  params:{
    namespace : null,
    datasource : null,
    stream : null,
    watchlist : null
  }

})
.state('processorControlPanel',
{
  url: "/admin/processorRoadmap",
  views: {
    "header" : {
      templateUrl: "/home/template/header.html",
      controller: "HeaderCtrl"
    },
    "content" : {
      templateUrl: "adminDashboard/template/processorControlPanel.html",
      controller:"processorControlPanelCtrl"
      },
    "footer" : {
      templateUrl:"/home/template/footer.html"
    }
  }
});

}]);
