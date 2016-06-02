angular.module('tattva')
.controller('publisherCtrl', ['$scope','$mdDialog','publisherSettingFactory', "data",
function($scope,$mdDialog,publisherSettingFactory, data){
  $scope.publisherData = data;
  console.log("Publisher data within publisherCtrl is : ", $scope.publisherData);

  $scope.hide = function() {
    $mdDialog.hide();
  };

  $scope.updateBackPublisher = function(Data) {
console.log(Data);
    $scope.tabs=[];
    angular.forEach($scope.uiPublisherConfig.widgetTabs, function(tab){
      if(tab.selected){
        $scope.tabs.push(tab.name);
      }
    });
$scope.name="publishToDashboard";
var publisherData=[];
var publisherExp={
  publishType:$scope.name,
  graphTypes:$scope.graphTypes,
  tabsType:$scope.tabs,
  widgetSizes:$scope.widgetSize,
  logDataDisplayType:$scope.logDataDisplayType,
}
console.log(publisherExp);
publisherData.push(publisherExp);
$scope.publisherData.publisher=publisherData;
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
      {"name":"Summary","value":"summary"},
      {"name":"Graph","value":"graph"},
      {"name":"LogDataViewer"},
      {"name":"ExecutionFlow","value":"flow"}
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
}]);
