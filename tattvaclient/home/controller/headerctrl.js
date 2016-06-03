angular.module('tattva')
.controller('HeaderCtrl',["$scope","$http",function($scope,$http){
  $scope.header="TATTVA - Complex Event Processor";
  $scope.loadData= function(){
    $http.get('/sideNav').then(function(response){
      $scope.items=response.data;
      console.log($scope.data);
    })
  };
  $scope.loadData();

  // $scope.items= [
  //   {
  //     "menu" : "Dashboard",
  //     "link" : "user",
  //     "icon" : "dashboard",
  //   },
  //   {
  //     "menu" : "Design",
  //     "link" : "design.summary",
  //     "icon" : "playlist_add",
  //     "children" : [
  //       {
  //         "menu" : "Namespace",
  //         "link" : "design.namespace"
  //       },
  //       {
  //         "menu" : "Data Sources",
  //         "link" : "design.instance"
  //       },
  //       {
  //         "menu" : "Data Streams",
  //         "link" : "design.streams"
  //       },
  //       {
  //         "menu" : "Functions",
  //         "link" : "design.function"
  //       },
  //       {
  //         "menu" : "Watch Lists",
  //         "link" : "design.watchlist"
  //       }
  //     ]
  //   },
  //   {
  //     "menu" : "Organisation",
  //     "link" : "organisation",
  //     "icon" : "group"
  //   },
  //   {
  //     "menu" : "Action",
  //     "link" : "action",
  //     "icon" : "gavel"
  //   },
  //   {
  //     "menu" : "Notification",
  //     "link" : "notification",
  //     "icon" :  "notifications"
  //
  //   }
  // ];
}]);
