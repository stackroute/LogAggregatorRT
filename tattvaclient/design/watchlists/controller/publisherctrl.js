angular.module('tattva')
.controller('publisherCtrl', ['$scope','$mdDialog','publisherSettingFactory', "publisherData",
function($scope,$mdDialog,publisherSettingFactory, publisherData){
  //Data for publishing configuration passed form Watchlist controllre (parent controller)
  $scope.publisherData = publisherData;

  console.log("Publisher data within publisherCtrl is : ", $scope.publisherData);

  $scope.hide = function() {
    $mdDialog.hide();
  };

  $scope.updateBackPublisher = function(Data) {
    $scope.tabs=[];
    angular.forEach($scope.uiPublisherConfig.widgetTabs, function(tab){
      if(tab.selected){
        $scope.tabs.push(tab.name);
      }
    });

    $scope.name="publishToDashboard";
    $scope.publisherData.publishers
    var publisherExp={
      publishType:$scope.name,
      graphTypes:$scope.graphTypes,
      tabsType:$scope.tabs,
      widgetSizes:$scope.widgetSize,
      logDataDisplayType:$scope.logDataDisplayType,
    }
    console.log(publisherExp);
    $scope.publisherData.publisher.push(publisherExp);
    $mdDialog.hide();
  };

  $scope.cancel = function() {
    $mdDialog.cancel();
  };

  $scope.uiPublisherConfig = {
    "widgetSizes": [
      {"name":"Small","value":"30"},
      {"name":"Standard","value":"50"},
      {"name":"Wide","value":"70"}
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
