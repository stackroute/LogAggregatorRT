angular.module("tattva")
.controller('operator',['$scope', '$rootScope','$mdDialog','$timeout', '$q', '$log','loadExprData', function($scope,$rootScope,$mdDialog,$timeout, $q, $log,loadExprData) {
  var self = this;
  self.simulateQuery = false;
  self.isDisabled    = false;
  self.options       = loadAll();
  self.querySearch   = querySearch;
  self.selectedItemChange = selectedItemChange;
  self.searchTextChange   = searchTextChange;
  function querySearch (query) {
    var results = query ? "self.options.filter( createFilterFor(query) )" : self.options,
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
  function selectedItemChange(item, expr) {
    console.log("Operator item: " , item);
    expr.watch.operator = item;
  }
  function loadAll() {
    var operator = loadExprData.getoperatorOption();
    return operator;
  }
  function createFilterFor(query) {
    var lowercaseQuery = angular.lowercase(query);
    return function filterFn(operator) {
      return (operator.indexOf(lowercaseQuery) === 0);
    };
  }
}]);
