angular.module("tattva")
.controller('namespacectrlhistoricfunction',['$scope','historicfunctionsFactory','$stateParams', 'namespaceFactory', '$rootScope','$mdDialog','$timeout', '$q', '$log','loadExprData','$http','wlstDataService' ,function($scope,historicfunctionsFactory,$stateParams,namespaceFactory,$rootScope,$mdDialog,$timeout, $q, $log,loadExprData,$http,wlstDataService) {

  $scope.DataField=[];
  
  var self = this;
  self.simulateQuery = false;
  self.isDisabled    = false;
  self.namespaceOption = loadAll();
  self.querySearch   = querySearch;
  self.selectedItemChange = selectedItemChange;
  self.searchTextChange   = searchTextChange;

  if ($stateParams.edithistoricfunctiondata) {
    historicfunctionsFactory.gethistoricfunctionsDetails($stateParams.edithistoricfunctiondata).then(function(data)
    {
      self.selectedItem = data.watchlist;
    })
  }

  function querySearch (query) {
    var results = query ? "self.namespaceOption.filter( createFilterFor(query) )" : self.namespaceOption,
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
      var fieldData=[];
      $scope.fndef.watchlist=item;
      wlstDataService.getWatchlistData(item).then(function(watchlistdata){
        $scope.fndef.namespace=watchlistdata.data.namespace;
        $scope.fndef.organization=watchlistdata.data.orgsite;
        namespaceFactory.getNamespaceDetails(watchlistdata.data.namespace).then(function(data){
          for (i in data.dataSchema){
            fieldData.push(data.dataSchema[i].name)
          }
        })
      })
      $scope.DataField= fieldData;

    }
    else {
      $scope.fndef.watchlist=undefined;
    }
  }

  function loadAll() {
    var watchlistalldata=[];
    loadExprData.getNameSpacenames().then(function (argument) {

      for(i in argument){
        loadExprData.getwatchlistdata(argument[i]).then(function(data){
          for(j in data){
            watchlistalldata.push(data[j]);
          }
        })
      }
    });
    return watchlistalldata;
  }

  function createFilterFor(query) {
    var lowercaseQuery = angular.lowercase(query);
    return function filterFn(namespaceOption) {
      return (namespaceOption.name.indexOf(lowercaseQuery) === 0);
    };
  }



}]);
