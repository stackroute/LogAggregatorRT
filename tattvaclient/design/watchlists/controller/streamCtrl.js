angular.module("tattva")
.controller('Streamctrl',['$scope', '$rootScope','$mdDialog','$timeout', '$q', '$log','loadExprData','streamFactory', function($scope,$rootScope,$mdDialog,$timeout, $q, $log,loadExprData,streamFactory) {
  var self = this;
  self.simulateQuery = false;
  self.isDisabled    = false;
  self.stream        = loadAll();
  self.querySearch   = querySearch;
  self.selectedItemChange = selectedItemChange;
  self.searchTextChange   = searchTextChange;

  if ( $scope.$parent.editNamespace) {
    self.selectedItem =   $scope.$parent.wlstdef.stream;
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
    var streamData=[];
    $scope.$watch('wlstdef.namespace',function(){
        if(streamData.length!=0)
          {
            streamData.splice(0,streamData.length);
          }
      if(typeof($scope.$parent.wlstdef.namespace)=="undefined") return;
      streamFactory.sendStream($scope.$parent.wlstdef.namespace).then(function(res) {
        var data = res.data;
        for(i in data) {
          streamData.push(data[i].streamname);
        }
      }, function(res) { console.log("Error: ", res.data.error); $scope.error = res.data.error; })
    }
  );
  return streamData;
}


      function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);
        return function filterFn(streams) {
          return (streams.indexOf(lowercaseQuery) === 0);
        };
      }
    }]);
