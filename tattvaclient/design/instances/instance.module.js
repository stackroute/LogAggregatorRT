angular.module("tattva").config(['$stateProvider','$urlRouterProvider', function($stateProvider){
  $stateProvider
  
  .state('design.instance',
  {
    url: "/instance",
    
        templateUrl: "design/instances/template/instance.html",
        controller: "instCtrl"
      
  })
  .state('design.instance.addInstance',{
    url:"/addInstance",
    controller:"instCtrl"
  })
   .state('design.instance.addInstance.created',{
    url:"/createdInstance",
    templateUrl:"design/instances/template/status.html",
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
}]);
