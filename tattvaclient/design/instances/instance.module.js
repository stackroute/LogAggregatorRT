angular.module("tattva").config(['$stateProvider','$urlRouterProvider', function($stateProvider){
  $stateProvider
  .state('design',{
    url: "/design",
    views: {
      "header" : {
        templateUrl: "/home/template/header.html",
        controller: "HeaderCtrl"
      },
      "content@" : {
        templateUrl: "/partials/design.html",
        controller: "orgCtrl"
      },
      "footer" : {
        templateUrl: "/home/template/footer.html"
      }
    }

  })
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
