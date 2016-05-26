angular.module("tattva")
.controller('lfield',['$scope', '$rootScope','$mdDialog','$timeout', '$q', '$log', function($scope,$rootScope,$mdDialog,$timeout, $q, $log) {
  $scope.dialogueData={};
console.log($scope.dialogueData)
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
        locals: { "fieldData": expr.watch.lfield }
      }).then(function(response) {
        expr.watch.lfield = response;
        console.log("RESOLVED with response: ", response, " data in autocomplete ctrl: ", expr.watch.lfield);
      }, function(response) {
        console.log("** REJECTED ** with response: ", response, " data in autocomplete ctrl: ", expr.watch.lfield);
      }).finally(function() {
      })
    };
    $scope.showDialog();
  }
  function loadAll() {
    var fieldOptions = [
      // {name: "Data field from namespace", expressionType: "accumulate", template: 'accumulate',type:'Accumulate'},
      // {name: "Input your own Value", expressionType: "inputValue", template: 'inputValue',type:'input Value'},
    {
      type: "DataFields",
      name: "Data fields from namespace",
      controller: "DataFieldsCtrl",
      template: "DataFields"
    },
    {
      name: "Input Value",
      controller: "InputValueCtrl",
      template: "inputValue",
      type: "inputvalue",
    },
    {
      type: "constant",
      name: "Constants",
      controller: "ConstantCtrl",
      template: "constant"
    },
    {
      type: "Function",
      name: "Function",
      controller: "FunctionCtrl",
      template: "function"
    },
    {
      type: "Accumulate",
      name: "Accumulate",
      controller: "AccumulateCtrl",
      template: "accumulate"
    },
    {
      type: "historicData",
      name: "Historic Data",
      controller: "HistoricDataCtrl",
      template: "historicData"
    }

    // {type:"Constants",name:"Constant",template:"constant.html",controller:"constantCtrl"},
      // {name: "Constants", template: 'constant',type:'Constants'},
      // {name: "Function", template: 'function',type:'Function'},
      // {name: "Accumulate", template: 'accumulate',type:'Accumulate'},
      // {name: "Historic Data", template: 'historicData',type:'Historic Data'}
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
