angular.module('tattva')
.config(['$stateProvider','$urlRouterProvider',
  function($stateProvider){
    $stateProvider
    .state('design.historicFunction',
    {
      url:'/historicfunctions',
      templateUrl: "/design/historicFunctions/template/historicfunctionlist.html",
      controller:"historicfunctionlistCtrl",
      resolve:{
        historicfunctionsColln:function(historicfunctionsFactory) {
          return historicfunctionsFactory.gethistoricfunctions().then(function(response){
            return response;
          }, function(response){
            console.log("error in getting historicfunctions data: ", response);
          });
        }
      }
    })
    .state('design.historicfunctionadd', {
      url:"/historicfunction/new",
      templateUrl:"/design/historicFunctions/template/historicfunctionadd.html",
      controller: 'historicfunctionAddCtrl'
    })
    .state('design.historicfunctionedit',{
      url: "/historicfunction/:edithistoricfunctiondata",
      templateUrl:"/design/historicFunctions/template/historicfunctionadd.html",
      controller: 'historicfunctionAddCtrl'

   })
  }]);
