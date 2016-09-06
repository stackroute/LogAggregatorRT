angular.module("tattva")
.controller('rfield',['$scope', '$rootScope','$mdDialog','$timeout', '$q', '$log','loadExprData','watchlistconfg', function($scope,$rootScope,$mdDialog,$timeout, $q, $log,loadExprData,watchlistconfg) {
  $scope.fieldData={};
  var self = this;
  self.simulateQuery = false;
  self.isDisabled    = false;
  self.options       = loadAll();
  self.querySearch   = querySearch;
  self.selectedItemChange = selectedItemChange;
  self.searchTextChange   = searchTextChange;
  if ( $scope.$parent.editNamespace) {
    self.selectedItem =   $scope.expr.watch.rfield.fieldType;
  }
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

    if(item === undefined) return;
    var dialogTemplate = '/design/watchlists/exprfields/'+item.template+'/' + item.template+'.html';
console.log('/design/watchlists/exprfields/'+item.template+'/' + item.template+'.html')
    if(expr.watch.rfield.fieldType !== undefined) {
      expr.watch.rfield.fieldType = item.type;
    } else if(expr.watch.rfield.fieldType != item.type) {
      expr.watch.rfield = { fieldType : item.type };
      // expr.watch.rfield=null;
    }

    $scope.showDialog = function(ev) {
      $mdDialog.show({
        controller:item.controller,
        templateUrl: dialogTemplate,
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: false,
        escapeToClose : false,
        locals: { "fieldData": expr.watch.rfield,"fieldData2":$scope.wlstdef}
      }).then(function(response) {
        expr.watch.rfield = response;
        //console.log("RESOLVED with response: ", response, " data in autocomplete ctrl: ", expr.watch.rfield);
      }, function(response) {
        //console.log("** REJECTED ** with response: ", response, " data in autocomplete ctrl: ", expr.watch.rfield);
      }).finally(function() {
      });
    };
    $scope.showDialog();
  }

  function loadAll() {
var fieldOptions=watchlistconfg.getfieldOption();
    return fieldOptions;
  }

  function createFilterFor(query) {
    var lowercaseQuery = angular.lowercase(query);
    return function filterFn(fieldOptions) {
      return (fieldOptions.name.indexOf(lowercaseQuery) === 0);
    };
  }

}]);
