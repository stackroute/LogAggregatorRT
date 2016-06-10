angular.module('tattva')
.config(['$stateProvider','$urlRouterProvider',
function($stateProvider){
  $stateProvider
  .state('design.namespace', {
    url: "/namespaces",
    templateUrl: "/design/namespaces/template/listNamespace.html",
    controller:"listNamespaceCtrl",
    resolve:{
      getListOfNamespace:function(namespaceFactory){
        return namespaceFactory.getNameSpace().then(function(response){
          console.log(response);
          return response;
        });
      }
    }
  })
  .state('design.createNamespace', {
    url: "/newnamespace",
    templateUrl: "/design/namespaces/template/createNamespace.html",
    controller:"createNamespaceCtrl"
  })
  .state('design.editNamespace', {
    url: "/namespace/:editNamespaceData",
    templateUrl: "/design/namespaces/template/viewNamespace.html",
    controller:"editNamespaceCtrl"
  })
}]);
