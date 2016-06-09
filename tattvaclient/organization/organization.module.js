
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
}).state('organisation.organisationEdit', {
    url: '/organisationEdit/:userName',
    views: {
      "header" : {
        templateUrl: "/home/template/header.html",
        controller: "HeaderCtrl"
      },
      "content@" : {
        templateUrl: "organization/views/adminEdit.html",
        controller: "orgEditCtrl"
      },
      "footer" : {
        templateUrl: "/home/template/footer.html"
      }
    }
  });
}]);
