angular.module('tattva')
.controller('publisherCtrl', ['$scope','$mdDialog','publisherSettingFactory', "publisherData",
function($scope,$mdDialog,publisherSettingFactory, publisherData){
  //Data for publishing configuration passed form Watchlist controllre (parent controller)
  $scope.publisherData = publisherData;

  $scope.uiPublisherConfig = getConfigData();

  $scope.widgetTabs = $scope.uiPublisherConfig.widgetTabs.slice();

  if($scope.publisherData.tabs){
    $scope.publisherData.tabs.forEach(function(tabName){
      console.log(tabName, " is selected");

      //iterate through this array to set the tabName to be selected
      angular.forEach($scope.widgetTabs, function(tab){
        if(tab.name == tabName){
          tab.selected = true;
        }
      });
    });
  }

  // $scope.displaySize = $scope.publisherData.displaySize;
  // $scope.logFormat=$scope.publisherData.logFormat;
  // $scope.graphType=$scope.publisherData.graphType;
  // $scope.tabs=$scope.publisherData.tabs;

  //console.log("Publisher data within publisherCtrl is : ", $scope.publisherData);

  $scope.hide = function() {
    $mdDialog.hide();
  };

  $scope.updateBackPublisher = function(Data) {
    //To
    // $scope.tabs=[];
    angular.forEach($scope.widgetTabs, function(tab){
      if(tab.selected){
        $scope.publisherData.tabs.push(tab.name);
      }
    });
    $mdDialog.hide($scope.publisherData);
  };

  $scope.cancel = function() {
    $mdDialog.cancel();
  };

  function getConfigData() {
    return {
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
  }
}]);
