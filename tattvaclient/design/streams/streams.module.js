angular.module('tattva')
.config(['$stateProvider','$urlRouterProvider',function($stateProvider){
  $stateProvider
  .state('design.streams',
  {
    url:'/streams',
    templateUrl: "/design/streams/template/namespaceListView.html",
    controller: 'namespaceListCtrl'
  })
  .state('design.streams.viewStreams',
  {
    url:'/listStreams/:nsname',
    templateUrl: "/design/streams/template/streamsView.html",
    controller: 'viewStreamsCtrl'                       //< change this name > < changed >
  })
  .state('design.streams.viewdata',
  {
    url:'/viewStream/:streamName',                        //< url has to change > < changed >
    templateUrl: "/design/streams/template/streamsDataView.html",
    controller: 'streamsDataCtrl'
  })
  .state('design.create',
  {
    url: '/create',
    templateUrl: "/design/streams/template/streamCreate.html",
    controller: 'streamCreateCtrl'
  })
  .state('design.edit',
  {
    url: '/editStream',
    templateUrl: "/design/streams/template/streamEdit.html",
    controller: 'streamEditCtrl'
  });
}]);


// URI
// Route
// url
// state
// view
