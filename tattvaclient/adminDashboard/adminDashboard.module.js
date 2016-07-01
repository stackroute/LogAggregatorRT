angular.module("tattva").config(['$stateProvider','$urlRouterProvider', function($stateProvider){
.stateProvider
.state('adminHome',
{
  url: "/tattva/admin/dashboard",
  views: {
    "header" : {
      templateUrl: "/home/template/header.html",
      controller: "HeaderCtrl"
    },
    "content@" : {
      templateUrl: "/template/adminDashboard.html"
      },
    "footer" : {
      templateUrl:"/home/template/footer.html"
        }
  }
})
.state('adminHome.selection',
{
  url: "/selection",
  templateUrl:"/template/adminSelection.html",
  controller:"adminSelectionController"
})
.state('watchInfo',
{
  url: "/tattva/admin/org/:orgSite/watch/:watchlist",
  params: {
    org:null,
    watchlist: null
  },
  views: {
    "header" : {
      templateUrl: "",
      controller: "HeaderCtrl"
    },
    "content@" : {
      templateUrl: ""
      },
    "footer" : {
      templateUrl:
        }
    // "adminSelection" :{
    //   templateUrl:"/"
    // }
  }
}
)
}
