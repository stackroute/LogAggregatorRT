angular.module('tattva')
.controller('HeaderCtrl',function($scope,$http){
  $scope.header="TATTVA - CEP";
  $scope.items= [
    {
      "menu" : "Dashboard",
      "link" : "user",
      "icon" : "dashboard"
    },
    {
      "menu" : "Design",
      "link" : "design",
      "icon" : "playlist_add",
      "children" : [
        {
          "menu" : "Namespace",
          "link" : "design.namespace"
        },
        {
          "menu" : "Data Sources",
          "link" : "design.instance"
        },
        {
          "menu" : "Data Streams",
          "link" : "design.streams"
        },
        {
          "menu" : "Functions",
          "link" : "design.function"
        },
        {
          "menu" : "Watch Lists",
          "link" : "design.watchlist"
        }
      ]
    },
    {
      "menu" : "Organisation",
      "link" : "organisation",
      "icon" : "group"
    },
    {
      "menu" : "Action",
      "link" : "action",
      "icon" : "gavel"
    },
    {
      "menu" : "Notification",
      "link" : "notification",
      "icon" :  "notifications"

    }
  ];
});
