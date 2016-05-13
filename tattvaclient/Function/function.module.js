angular.module('tattva').config(['$stateProvider','$urlRouterProvider', function($stateProvider){
  $stateProvider
  // .state('design',{
  //   url: "/design",
  //   views: {
  //     "header" : {
  //       templateUrl: "/home/template/header.html",
  //       controller: "HeaderCtrl"
  //     },
  //     "content@" : {
  //       templateUrl: "/partials/design.html",
  //       controller: "orgCtrl"
  //     },
  //     "footer" : {
  //       templateUrl: "/home/template/footer.html"
  //     }
  //   }
  //
  // })
  .state('design.function',
  {
    url:'/function',
    templateUrl: "/Function/template/functionlist.html",
    controller:"functionlistCtrl"

  })
  .state('design.functionEdit', {
    url: '/functional/:functionname',
    templateUrl: '/Function/template/cfunctions.html',
    controller: 'functionEditCtrl'
  })
  .state('design.addfunction', {
    url:"/addFunction",
    templateUrl:"/Function/template/cfunctions.html"
  })


}
]);
