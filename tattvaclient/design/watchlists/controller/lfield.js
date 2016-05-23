angular.module("tattva")
.controller('lfield',['$scope', '$rootScope','$mdDialog','$timeout', '$q', '$log', function($scope,$rootScope,$mdDialog,$timeout, $q, $log) {
  $scope.dialogueData={};
  var self = this;
  self.simulateQuery = false;
  self.isDisabled    = false;
  self.options       = loadAll();
  self.querySearch   = querySearch;
  self.selectedItemChange = selectedItemChange;
  self.searchTextChange   = searchTextChange;
  function querySearch (query) {
    var results = query ? self.options.filter( createFilterFor(query) ) : self.options,
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
    var dialogTemplate = '/design/watchlists/template/' + item.template;

    if(expr.watch.lfield.fieldType !== undefined) {
      expr.watch.lfield.fieldType = item.type;
    } else if(expr.watch.lfield.fieldType != item.type) {
      // expr.watch.lfield = { fieldType : item.type };
          expr.watch.lfield=null;
    }

    $scope.showDialog = function(ev) {
      $mdDialog.show({
        controller:'DialogControllerwatchlist',
        templateUrl: dialogTemplate,
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: false,
        escapeToClose : false,
        locals: { "dialogueData": expr.watch.lfield }
      }).then(function(response) {
        expr.watch.lfield = response;
        console.log("RESOLVED with response: ", response, " data in autocomplete ctrl: ", expr.watch.lfield);
      }, function(response) {
        console.log("** REJECTED ** with response: ", response, " data in autocomplete ctrl: ", expr.watch.lfield);
      }).finally(function() {
        //console.log("finally gone..!");
      })
    };
    $scope.showDialog();
  }
  function loadAll() {
    var fieldOptions = [
      {name: "Data field from namespace", template: 'accumulate.html',type:'Data field from namespace'},
      {name: "Input your own Value", template: 'watchlistdialogueentervalue.html',type:'Input your own Value'},
      {name: "Constants", template: 'watchlistdialogueconstants.html',type:'Constants'},
      {name: "Function", template: 'watchlistdialoguefunction.html',type:'Function'},
      {name: "Accumulate", template: 'accumulate.html',type:'Accumulate'},
      {name: "Historic Data", template: 'historic data.html',type:'Historic Data'}
    ];

    return fieldOptions;
  }

  function createFilterFor(query) {
    var lowercaseQuery = angular.lowercase(query);
    return function filterFn(fieldOptions) {
      return (fieldOptions.name.indexOf(lowercaseQuery) === 0);
    };
  }
}]);
