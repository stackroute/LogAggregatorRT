angular.module('tattva')
  .controller("processorControlPanelCtrl", ['$scope', '$http', 'adminFactory',
    function($scope, $http, adminFactory) {
      //api call for all the available processors
      function getProcessorMap() {
        adminFactory.getprocessors().then(function(res) {
          //console.log("processors res.data", res.data);
          $scope.watchtaskfilter = "none";
          $scope.processors = res.data;
          $scope.nop = Object.keys($scope.processors).length;
        }, function(res) {
          //error
          console.log("Failed to get proccessors info error:", res.data.error);
        });
      }
      getProcessorMap();

      $scope.socket = io();
      $scope.socket.emit('subscribe::adminevents', {});
      $scope.socket.on('watchloop::onAdminEvent', function(eventData) {
        //console.log("Got admin event ", eventData);

        if (eventData.channel == 'watchloop::onWatchProcessorJoin') {
          // console.log("Url: ", eventData.data.url, " data: ", eventData.data);
          $scope.processors[eventData.data.url] = eventData.data;
          // console.log("Updated ", $scope.processors);
          $scope.$apply();
        } else if (eventData.channel == 'watchloop::onWatchProcessorLeave') {
          //TODO
        } else if (eventData.channel == 'watchloop::onWatchListJoin') {
          //Show toast notification
          getProcessorMap();
          $scope.$apply();
        }
      });
      $scope.$on('$destroy', function() {
        if ($scope.socket) {
          $scope.socket.disconnect();
        }
      });
    }
  ])
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('dark-grey').backgroundPalette('grey');
  });