angular.module("tattva").
config(['$stateProvider','$urlRouterProvider', function($stateProvider){
  $stateProvider
  .state('design.instance', {
    url: "/instance",
        templateUrl: "design/instances/template/instance.html",
        controller: "instCtrl"
  })
  .state('design.instance.viewInstance.addInstance',{
    url:"/new",
    controller:"instCtrl"
  })
   .state('design.instance.viewInstance.addInstance.created',{
    url:"/createdInstance",
    controller:"instCtrl"
   /*views:{
    "@":{
   templateUrl:"partials/status.html",
    controller:"instCtrl"
   }}*/})
  .state('design.instance.viewInstance', {
    url: "/:name",
    templateUrl:"design/instances/template/viewInstance.html",
    controller:"viewinstCtrl"
  })
  .state('design.instance.viewInstance.edit',{
    url:'/edit'

  })
}]);
