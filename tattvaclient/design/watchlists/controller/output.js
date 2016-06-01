angular.module("tattva")
.controller('output',['$scope', '$rootScope','$mdDialog','$timeout', '$q', '$log', function($scope,$rootScope,$mdDialog,$timeout, $q, $log) {
  // var self = this;
  //   self.simulateQuery = false;
  //   self.isDisabled    = false;
  //   self.output        = loadAll();
  //   self.querySearch   = querySearch;
  //   self.selectedItemChange = selectedItemChange;
  //   self.searchTextChange   = searchTextChange;
  // function querySearch (query) {
  //   var results = query ? self.output.filter( createFilterFor(query) ) : self.output,
  //   deferred;
  //   if (self.simulateQuery) {
  //     deferred = $q.defer();
  //     $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
  //     return deferred.promise;
  //   } else {
  //     return results;
  //   }
  // }
  // function searchTextChange(text) {
  //   $log.info('Text changed to ' + text);
  // }

  $scope.opnePublisherDialogWindow = function () {
    console.log("in save");
    $scope.publisherData = {"WatchListName": "My first watch list"};
    // console.log("current slide is : ", $scope.currentSlide);
    $scope.showUIPublisherDialog = function(ev) {
      console.log("hi");
      $mdDialog.show({
        controller: "publisherCtrl",
        templateUrl: "/design/watchlists/template/publisherSetting.html",
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: false,
        escapeToClose : false,
        locals: { "data": $scope.wlstdef }
      }).then(function(response) {
        console.log("RESOLVED with response: ", response, " publisher in parent: ", $scope.publisherData);
      }, function(response) {
        console.log("** REJECTED ** with response: ", response, " publisher in parent: ", $scope.publisherData);
      }).finally(function() {
        console.log("finally gone..!");
      });
    };
    $scope.showUIPublisherDialog();
    }
  // function selectedItemChange(item) {
  // if(JSON.stringify(item)!=undefined)
  //   {
  //   $log.info('Item changed to ' + JSON.stringify(item));
  //
  //   var dialogTemplate = '/design/watchlists/template/'+item.template +'/'+ item.template +'.html';
  //
  //
  //     $scope.wlstdef.publisher.publisherType=item;
  //       console.log(item);
  //     if(item==="UI Publisher")
  //     {
  //       console.log("in publisher");
  //       $scope.publisherData = {"WatchListName": "My first watch list"};
  //       // console.log("current slide is : ", $scope.currentSlide);
  //       $scope.showUIPublisherDialog = function(ev) {
  //         console.log("hi");
  //         $mdDialog.show({
  //           controller: "publisherCtrl",
  //           templateUrl: "/design/watchlists/template/publisherSetting.html",
  //           parent: angular.element(document.body),
  //           targetEvent: ev,
  //           clickOutsideToClose: false,
  //           escapeToClose : false,
  //           locals: { "data": $scope.wlstdef }
  //         }).then(function(response) {
  //           console.log("RESOLVED with response: ", response, " publisher in parent: ", $scope.publisherData);
  //         }, function(response) {
  //           console.log("** REJECTED ** with response: ", response, " publisher in parent: ", $scope.publisherData);
  //         }).finally(function() {
  //           console.log("finally gone..!");
  //         });
  //       };
  //       $scope.showUIPublisherDialog();
  //     }
  //     else if (true) {
  //
  //         $scope.wlstdef.output=undefined;
  //     }
  //   }
  // }
  // function loadAll() {
  //   var output = ['UI Publisher', 'Save to Database', 'Output to Output Stream', 'External Source'];
  //   return output;
  // }
  function createFilterFor(query) {
    var lowercaseQuery = angular.lowercase(query);
    return function filterFn(output) {
      return (output.indexOf(lowercaseQuery) === 0);
    };
  }
}]);
