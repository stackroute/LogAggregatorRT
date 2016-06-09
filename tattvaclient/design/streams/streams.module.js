angular.module('tattva')
.config(['$stateProvider','$urlRouterProvider',function($stateProvider){
  $stateProvider
  .state('design.streams',
  {
    url:'/streams',
    templateUrl: "/design/streams/template/namespacelistview.html",
    controller: 'namespaceListCtrl'
  })
  .state('design.streams.viewStreams',
  {
    url:'/listStreams/:nsname',
    templateUrl: "/design/streams/template/streamsview.html",
    controller: 'viewStreamsCtrl'                       //< change this name > < changed >
  })
  .state('design.streams.viewdata',
  {
    url:'/viewStream/:streamName',                        //< url has to change > < changed >
    templateUrl: "/design/streams/template/streamsdataview.html",
    controller: 'streamsDataCtrl'
  })
  .state('design.create',
  {
    url: '/create',
    templateUrl: "/design/streams/template/streamcreate.html",
    controller: 'streamCreateCtrl'
  })
  .state('design.edit',
  {
    url: '/editStream',
    templateUrl: "/design/streams/template/streamedit.html",
    controller: 'streamEditCtrl'
  });
}]);
