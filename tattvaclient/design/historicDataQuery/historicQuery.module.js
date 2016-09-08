angular.module('tattva')
.config(['$stateProvider','$urlRouterProvider',
  function($stateProvider){
    $stateProvider
    .state('design.historicQuery',
    {
      url:'/historicQuery',
      templateUrl: "/design/historicDataQuery/template/historicQueryList.html",
      controller:"historicQueryListCtrl",
      resolve:{
        historicQueryColln:function(historicQueryFactory) {
          return historicQueryFactory.getHistoricQuery().then(function(response){
            return response;
          }, function(response){
            console.log("error in getting historic Queries data: ", response);
          });
        }
      }
    })
    .state('design.historicQueryAdd', {
      url:"/historicQuery/new",
      templateUrl:"/design/historicDataQuery/template/historicQueryForm.html",
      controller: 'historicQueryFormCtrl'
    })
    .state('design.historicQueryEdit',{
      url: "/historicQuery/:editHistoricQueryData",
      templateUrl:"/design/historicDataQuery/template/historicQueryForm.html",
      controller: 'historicQueryFormCtrl'

   })
  }]);
