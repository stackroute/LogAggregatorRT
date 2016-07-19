angular.module('tattva')
  .controller("processorControlPanelCtrl",['$scope','$http','adminFactory',
  function($scope,$http,adminFactory){
  //api call for all the available processors

  //api call for the watchlists running in a particular processor
$scope.processorMap = [
  {
    "watchName": "consequat",
    "watchTask": "cupidatat"
  },
  {
    "watchName": "minim",
    "watchTask": "adipisicing"
  },
  {
    "watchName": "ea",
    "watchTask": "pariatur"
  },
  {
    "watchName": "deserunt",
    "watchTask": "fugiat"
  },
  {
    "watchName": "minim",
    "watchTask": "mollit"
  },
  {
    "watchName": "officia",
    "watchTask": "veniam"
  },
  {
    "watchName": "incididunt",
    "watchTask": "occaecat"
  },
  {
    "watchName": "commodo",
    "watchTask": "est"
  },
  {
    "watchName": "quis",
    "watchTask": "sint"
  },
  {
    "watchName": "Lorem",
    "watchTask": "occaecat"
  },
  {
    "watchName": "sint",
    "watchTask": "est"
  },
  {
    "watchName": "commodo",
    "watchTask": "officia"
  },
  {
    "watchName": "commodo",
    "watchTask": "ex"
  },
  {
    "watchName": "commodo",
    "watchTask": "irure"
  }

];
$scope.processorName = "processor1"
$scope.watchtaskfilter = "none";


}])
.config(function($mdThemingProvider){
  $mdThemingProvider.theme('dark-grey').backgroundPalette('grey');
});
