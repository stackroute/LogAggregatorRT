
angular.module('tattva').config(['$stateProvider','$urlRouterProvider', function($stateProvider){
  $stateProvider
  .state('organisation',
  {
    url: "/organisation",
    views: {
      "header" : {
        templateUrl: "/home/template/header.html",
        controller: "HeaderCtrl"
      },
      "content@" : {
        templateUrl: "organization/views/Admin_Page.html",
        controller: "orgCtrl"
      },
      "footer" : {
        templateUrl: "/home/template/footer.html"
      }
    }
  });

}
]);
