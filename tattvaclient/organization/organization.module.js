
angular.module('tattva').config(['$stateProvider','$urlRouterProvider', function($stateProvider){
  $stateProvider
.state('organisation',
{
  url: "/organisation",
  views: {
    "header" : {
      templateUrl: "/partials/header.html",
      controller: "headerCtrl"
    },
    "content@" : {
      templateUrl: "organization/views/Admin_Page.html",
        controller: "orgCtrl"
    },
    "footer" : {
      templateUrl: "/partials/footer.html"
    }
  }
});

}
]);
