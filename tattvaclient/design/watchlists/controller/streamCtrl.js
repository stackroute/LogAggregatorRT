angular.module("tattva")
.controller('Streamctrl',['$scope', '$rootScope','$mdDialog','$timeout', '$q', '$log','loadExprData', function($scope,$rootScope,$mdDialog,$timeout, $q, $log,loadExprData) {
  var self = this;
  self.simulateQuery = false;
  self.isDisabled    = false;
  self.stream        = loadAll();
  self.querySearch   = querySearch;
  self.selectedItemChange = selectedItemChange;
  self.searchTextChange   = searchTextChange;
  if ( $scope.$parent.wlstdefView !== undefined) {
    self.selectedItem =   $scope.$parent.wlstdefView.stream;
    console.log("stream name from stream ctrl", $scope.$parent.wlstdefView.stream);
  }

  function querySearch (query) {
    var results = query ? "self.stream.filter( createFilterFor(query) )" : self.stream,
    deferred;
    if (self.simulateQuery) {
      deferred = $q.defer();
      $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
      return deferred.promise;
    } else {
      return results;
    }
  }

  function searchTextChange(text) {
    $log.info('Text changed to ' + text);
  }
  function selectedItemChange(item) {
    $log.info('Item changed to ' + JSON.stringify(item));
    if(item!=undefined)
    {
      $scope.wlstdef.stream=item;
    }
    else {
      $scope.wlstdef.stream=undefined;
    }
  }


  function loadAll() {
    return loadExprData.getStreamname();
      }


      function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);
        return function filterFn(streams) {
          return (streams.indexOf(lowercaseQuery) === 0);
        };
      }
    }]);
