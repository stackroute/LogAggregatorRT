angular.module('tattva')
.config(['$stateProvider','$urlRouterProvider',
function($stateProvider){
  $stateProvider
  .state('design.constant',
  {
    url:'/constant',
    templateUrl: "/design/constant/template/constantlist.html",
    controller:"constantlistCtrl"
  })
  // .state('design.editconstant', {
  //   url: '/editconstant',
  //   templateUrl: '/design/constant/template/viewconstant.html',
  //   controller: 'constantEditCtrl'
  // })

  .state('design.addconstant', {
    url:"constant/addconstant",
    templateUrl:"/design/constant/template/constantform.html",
    controller: 'constantlistCtrl'
  })
}]);






























// .state('design.constantEdit', {
//   url: '/constant/:constantname',
//   templateUrl: '/design/constant/template/constantform.html',
//   controller: 'constantEditCtrl'
// })
