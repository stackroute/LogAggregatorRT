angular.module('tattva')
.controller('publisherCtrl', ['$scope','$mdDialog','publisherSettingFactory', 'publisherData','namespaceFactory','namespace',
function($scope,$mdDialog,publisherSettingFactory, publisherData,namespaceFactory,namespace){
  //Data for publishing configuration passed form Watchlist controllre (parent controller)
  $scope.publisherData = publisherData;
  $scope.namespace=namespace;
  $scope.uiPublisherConfig = getConfigData();

  $scope.widgetTabs = $scope.uiPublisherConfig.widgetTabs.slice();


    $scope.xParam=[];
    namespaceFactory.getNamespaceDetails($scope.namespace).then(function(data){
      for (i in data.dataSchema){
            $scope.xParam.push(data.dataSchema[i].name);
      }
    });

  if($scope.publisherData.tabs){
    //console.log("Before: ", $scope.widgetTabs);
    $scope.publisherData.tabs.forEach(function(tabName){
      //iterate through this array to set the tabName to be selected
      angular.forEach($scope.widgetTabs, function(tab){
        if(tab.name == tabName){
          tab.selected = true;
        }
      });
    });
  }
  $scope.hide = function() {
    $mdDialog.hide();
  };

  $scope.updateBackPublisher = function(Data) {
    //To
    $scope.publisherData.tabs=[];
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
        {"name":"Standard","value":"45"},
        {"name":"Wide","value":"90"}
      ],
      "widgetTabs": [
        {"name":"Graph","value":"graph"},
        {"name":"Log Format","value":"logFormat"},
        {"name":"Flow Map","value":"flowmap"}
      ],
      "graphTypes": [
        {"name":"Line","value":"line","icon":"show_chart"},
        {"name":"Donut","value":"donut","icon":"pie_chart"}
      ],
      "logDataDisplayType": [
        {"name":"JSON","value":"json"},
        {"name":"RawData","value":"rawdata"},
        {"name":"Table","value":"table"}
      ]
    };
  }
}]);
