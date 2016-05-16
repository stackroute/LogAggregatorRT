angular.module('tattva').config(['$stateProvider','$urlRouterProvider', function($stateProvider){
  $stateProvider
  .state('design.namespace', {
    url: "/namespace",
    templateUrl: "/design/namespaces/template/namespace.html",
    controller:"createNamespaceCtrl"
  })
  .state('design.listNameSpace', {
    url: "/namespaces/listNameSpace",
    templateUrl: "/design/namespaces/template/listNamespace.html",
    controller:"createNamespaceCtrl"
  })
  .state('design.createNamespace', {
    url: "/createNamespace",
    templateUrl: "/design/namespaces/template/createNamespace.html",
    controller:"createNamespaceCtrl"
  })
  .state('design.viewNamespace', {
    url: "/:viewNamespaceData",
    templateUrl: "/design/namespaces/template/viewNamespace.html",
    controller:"editNamespaceCtrl"
  })

}]);
