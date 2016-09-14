angular.module('tattva').config(['$stateProvider', '$urlRouterProvider', function($stateProvider) {
  $stateProvider
    .state('tattva.organisation', {
      url: "/organisation",
      views: {
        "content@": {
          templateUrl: "organization/views/Admin_Page.html",
          controller: "orgCtrl"
        }
      }
    }).state('tattva.organisation.organisationEdit', {
      url: '/organisationEdit/:userName',
      views: {
        "content@": {
          templateUrl: "organization/views/adminEdit.html",
          controller: "orgEditCtrl"
        }
      }
    }).state('tattva.organisation.search', {
      url: '/search',
      views: {
        "content@": {
          templateUrl: "organization/views/searchresult.html",
          controller: "orgCtrl"
        }
      },
      params: {
        'name': ''
      }
    });
}]);
