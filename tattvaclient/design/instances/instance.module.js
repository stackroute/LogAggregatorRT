angular.module("tattva").
config(['$stateProvider','$urlRouterProvider', function($stateProvider){
  $stateProvider
  .state('design.instance', {
    url: "/instance",
        templateUrl: "design/instances/template/instance.html",
        controller: "InstanceCtrl"
  })
  .state('design.instance.viewInstance', {
    url: "/:name",
    templateUrl:"design/instances/template/viewInstance.html",
    controller:"ViewInstanceCtrl"
  })
  .state('design.instance.viewInstance.edit',{
    url:'/edit'

  })
}]);
