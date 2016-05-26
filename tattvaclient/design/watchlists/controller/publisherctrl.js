angular.module('tattva')
.controller('publisherCtrl', ['$scope','$mdDialog','publisherSettingFactory', "data",
function($scope,$mdDialog,publisherSettingFactory, data){
  $scope.publisherData = data;
  console.log("Publisher data within publisherCtrl is : ", $scope.publisherData);

  $scope.hide = function() {
    $mdDialog.hide();
  };

  $scope.updateBackPublisher = function() {
    $mdDialog.hide();
  };

  $scope.cancel = function() {
    $mdDialog.cancel();
  };

  $scope.uiPublisherConfig = {
    "widgetSizes": [
      {"name":"Small","value":"30","icon":"fa fa-square fa-1g"},
      {"name":"Standard","value":"50","icon":"fa fa-square fa-2x"},
      {"name":"Wide","value":"70","icon":"fa fa-square fa-3x"}
    ],
    "widgetTabs": [
      {"name":"Summary","value":"summary", "hasOptions": false},
      {"name":"Graph","value":"graph", "hasOptions": true, "options": "graphTypes"},
      {"name":"LogDataViewer","value":"log", "hasOptions": true, "options": "logDataDisplayType"},
      {"name":"ExecutionFlow","value":"flow", "hasOptions": false}
    ],
    "graphTypes": [
      {"name":"Line","value":"line","icon":"fa fa-line-chart fa-3x"},
      {"name":"Donut","value":"donut","icon":"fa fa-pie-chart fa-3x fa-spin"}
    ],
    "logDataDisplayType": [
      {"name":"CSV","value":"csv"},
      {"name":"JSON","value":"json"},
      {"name":"RawData","value":"rawdata"},
      {"name":"Table","value":"table"}
    ]
  };

  // $scope.save=function(data){
  //   $scope.tabs=[];
  //   angular.forEach($scope.uiPublisherConfig.widgetTabs, function(tab){
  //     if(tab.selected){
  //       $scope.tabs.push(tab.name);
  //     }
  //   });
  //
  //   var publisherData = {
  //     uiPublisher_widgetSize : $scope.uiPublisher_widgetSize,
  //     tabs : $scope.tabs,
  //     uiPublisher_graphTypes : $scope.uiPublisher_graphTypes,
  //     uiPublisher_logDataDisplayType : $scope.uiPublisher_logDataDisplayType
  //   };
  //   console.log(publisherData);
  //   $scope.publisherData = publisherSettingFactory.publisherFactoryMthd(publisherData);
  //   var dialoguefordemoobject={};
  //   $scope.dialoguefordemo()=function(dialoguefordemoobject) {
  //     dialoguefordemofactory(dialoguefordemoobject).then(function(){
  //       console.log(dialoguefordemoobject);
  //     })
  //   }
  // }

}]);
