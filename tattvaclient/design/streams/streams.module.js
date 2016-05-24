angular.module('tattva')
.config(['$stateProvider','$urlRouterProvider',function($stateProvider){
  $stateProvider
  .state('design.streams',
  {
    url:'/displayStreams',
    templateUrl: "/design/streams/template/namespaceListView.html"
    // controller: 'nampespaceListController'
  })
  .state('design.streams.viewStreams',
  {
    url:'/listStreams/:nsname',
    templateUrl: "/design/streams/template/streamsView.html",
    controller: 'viewStreamsController'                       //< change this name > < changed >
  })
  .state('design.streams.viewdata',
  {
    url:'/viewStream/:streamNameList',                        //< url has to change > < changed >
    templateUrl: "/design/streams/template/streamsDataView.html",
    controller: 'viewController'
  })
  .state('design.create',
  {
    url: '/create',
    templateUrl: "/design/streams/template/streamCreate.html",
    controller: 'createController'
  })
  .state('design.edit',
  {
    url: '/editStream',
    templateUrl: "/design/streams/template/streamEdit.html",
    controller: 'editController'
  });
}]);


// URI
// Route
// url
// state
// view
