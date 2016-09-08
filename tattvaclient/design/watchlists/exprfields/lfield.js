angular.module("tattva")
.controller('lfield',['$scope', '$rootScope','$mdDialog','$timeout', '$q', '$log','loadExprData','watchlistconfg', function($scope,$rootScope,$mdDialog,$timeout, $q, $log,loadExprData,watchlistconfg) {
  $scope.dialogueData={};
// //console.log($scope.wlstdef.namespace);
var self = this;
self.simulateQuery = false;
self.isDisabled    = false;
self.options       = loadAll();
self.querySearch   = querySearch;
self.selectedItemChange = selectedItemChange;
self.searchTextChange   = searchTextChange;

if ( $scope.$parent.editNamespace) {
  self.selectedItem =   $scope.expr.watch.lfield.fieldType;
  console.log("Data in lfield : ", $scope.expr);
    //console.log("Namespace name from namespace ctrl", $scope.$parent.wlstdef.namespace);
  }
// @todo Implement filter for loading data
function querySearch (query) {
  var results = query ? "aa": self.options,
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
  $log.info('SEARCH Text changed to ' + text);
}

function selectedItemChange(item, expr) {
  if(item === undefined) return;

  var dialogTemplate = '/design/watchlists/exprfields/'+item.template +'/'+ item.template +'.html';

  if(expr.watch.lfield.fieldType !== undefined) {
    expr.watch.lfield.fieldType = item.type;
  } else if(expr.watch.lfield.fieldType != item.type) {
    expr.watch.lfield = { fieldType : item.type };
          // expr.watch.lfield=null;
        }


        $scope.showDialog = function(ev) {
          $mdDialog.show({
            controller: item.controller,
            templateUrl: dialogTemplate,
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: false,
            escapeToClose : false,
            locals: { fieldData: expr.watch.lfield,fieldData2:$scope.wlstdef}
          }).then(function(response) {
            expr.watch.lfield = response;
        //console.log("RESOLVED with response: ", response, " data in autocomplete ctrl: ", expr.watch.lfield);
      }, function(response) {
        //console.log("** REJECTED ** with response: ", response, " data in autocomplete ctrl: ", expr.watch.lfield);
      }).finally(function() {
      })
    };
    $scope.showDialog();
  }

  function loadAll() {
    var fieldOptions=watchlistconfg.getfieldOption();
    return fieldOptions;
  }

  function createFilterFor(query) {
    var lowercaseQuery = query;
    return function filterFn(fieldOptions) {
      return (fieldOptions===(lowercaseQuery));
    };
  }
}]);
