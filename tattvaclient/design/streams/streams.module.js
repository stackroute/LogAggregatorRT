angular.module('tattva').config(['$stateProvider','$urlRouterProvider', function($stateProvider){
  $stateProvider
  .state('design.streams',
  {
    url:'/displayStreams',
    templateUrl: "design/streams/template/namespaceListView.html"
  })

  .state('design.streams.viewStreams',
  {
    url:'/:namespaceobject',
    templateUrl: "design/streams/template/streamsView.html",
    controller: 'VICtrl'
  })
  .state('design.streams.viewdata',
  {
    url:'/:streamobject',
    templateUrl: "design/streams/template/streamsDataView.html",
    controller: 'viewCtrl'
  })
  .state('design.create',
  {
    url: '/create',
    templateUrl: "design/streams/template/streamCreate.html",
    controller: 'createController'
  });

}
]);
