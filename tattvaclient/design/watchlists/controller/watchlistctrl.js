angular.module("tattva")
.controller('WatchListCtrl', ['$scope', '$rootScope','$mdDialog','$timeout', '$q', '$log', function($scope,$rootScope,$mdDialog,$timeout, $q, $log) {
  var self = this;
  self.simulateQuery = false;
  self.isDisabled    = false;
  self.states        = loadAll();
  self.querySearch   = querySearch;
  self.selectedItemChange = selectedItemChange;
  self.searchTextChange   = searchTextChange;
  self.newState = newState;
  function newState(state) {
    alert("Sorry! You'll need to create a Constituion for " + state + " first!");
  }
  function querySearch (query) {
    var results = query ? self.states.filter( createFilterFor(query) ) : self.states,
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
  }
  function loadAll() {
    var allStates = 'Namespace1, Namespace2, Namespace3';
    return allStates.split(/, +/g).map( function (state) {
      return {
        value: state.toLowerCase(),
        display: state
      };
    });
  }
  function createFilterFor(query) {
    var lowercaseQuery = angular.lowercase(query);
    return function filterFn(state) {
      return (state.value.indexOf(lowercaseQuery) === 0);
    };
  }
  $scope.UI_Publish = function(ev) {
    $mdDialog.show({
      targetEvent: ev,
      parent: angular.element(document.body),
      clickOutsideToClose: true,
      title: 'This is an alert title',
      textContent: 'You can specify some description text in here.',
      ariaLabel:'Alert Dialog Demo',
      ok:'Got it!'
    }
  );
};

$scope.operator=['>','<']
$scope.showmesecound=true;
$scope.showmefirst=true;
$scope.namespaces = [{
  "name": "ngnix",
  "dataFields": [{"name": "request method", "field": "method", "type": "dimension"}]
}, {
  "name": "apache",
  "dataFields": [{"name": "request method", "field": "method", "type": "dimension"}]
}, {
  "name": "iot-sound",
  "dataFields": [{"name": "request method", "field": "method", "type": "dimension"}]
}, {
  "name": "iot-temprature",
  "dataFields": [{"name": "request method", "field": "method", "type": "dimension"}]
}];
$scope.datastreams = [{
  "name": "ngnix-stream-GET",
  "namespace": "ngnix"
}, {
  "name": "ngnix-stream-POST",
  "namespace": "ngnix"
}, {
  "name": "apache-stream-GET",
  "namespace": "apache"
}, {
  "name": "apache-stream-POST",
  "namespace": "apache"
}];
//     removestatement:function(){
//     //  console.log($scope.wlstdef.statements);
//     var lastItem = $scope.wlstdef.statements.length-1;
//     console.log(lastItem);
//   //  $scope.statements.splice(lastItem);
// };

$scope.savewatchlist=function(){
}
$scope.wlstdef = {
  statements: [],
  // savejoinby:function('name'){$scope.name=name,console.log($scope.name)},
  removestatement:function(){
    var lastItem = $scope.wlstdef.statements.length-1;
    this.statements.splice(lastItem);
  },
  addNewStatement: function(name) {
    if($scope.showmesecound){
      $scope.showmesecound=false;
    }
    var newStmt = {
      _id: (this.statements.length + 1),
      _joinexpressionBy:name,
      criterias: [],
      addNewClause: function(name) {
        if($scope.showmefirst){
          $scope.showmefirst=false;
        }
        var newClause = {_id: (this.criterias.length + 1),_joinby:name };
        this.criterias.push(newClause);
      },
      removecriterias:function(){
        var lastItem = this.criterias.length-1;
        this.criterias.splice(lastItem);
      }
    }
    this.statements.push(newStmt);
  }
}
}
]);
