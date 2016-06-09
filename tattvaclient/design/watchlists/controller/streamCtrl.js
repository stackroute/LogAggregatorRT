angular.module("tattva")
.controller('Streamctrl',['$scope', '$rootScope','$mdDialog','$timeout', '$q', '$log','loadExprData','streamFactory', function($scope,$rootScope,$mdDialog,$timeout, $q, $log,loadExprData,streamFactory) {
// console.log($scope.$parent.wlstdef.namespace);
  var self = this;
  self.simulateQuery = false;
  self.isDisabled    = false;
  self.stream        = loadAll();
  self.querySearch   = querySearch;
  self.selectedItemChange = selectedItemChange;
  self.searchTextChange   = searchTextChange;

  if ( $scope.$parent.editNamespace) {
    self.selectedItem =   $scope.$parent.wlstdef.stream;
    console.log("stream name from stream ctrl", $scope.$parent.wlstdef.stream);
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
      console.log('self.selectedItem changed =', "wdqedeq");
      if(typeof($scope.$parent.wlstdef.namespace)=="undefined") return;
      console.log("for display",$scope.$parent.wlstdef.namespace);
      streamFactory.sendStream($scope.$parent.wlstdef.namespace).then(function(data)
      {
        for(i in data)
        {
          streamData.push(data[i].streamname);
        }
      })
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
