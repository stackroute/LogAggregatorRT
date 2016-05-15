angular.module("tattva")
.controller('rfield',['$scope', '$rootScope','$mdDialog','$timeout', '$q', '$log', function($scope,$rootScope,$mdDialog,$timeout, $q, $log) {
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
    if(JSON.stringify(item)!=undefined)
    {
      console.log(item.value);
      if(item.value==="accumulate")
      {
        $log.info("hi inside dialogue");
        $scope.showAdd = function(ev) {
          $mdDialog.show({
            controller:'DialogControllerwatchlist',
            //@TODO convert as templateUrl
            templateUrl:'design/watchlists/template/rfieldaccumulate.html',
            targetEvent: ev,
          });
        }
        $scope.showAdd();
      }
      else if (item.value=="input your own value") {
        $scope.showAdd = function(ev) {
          $mdDialog.show({
            controller:'DialogControllerwatchlist',
            //@TODO
            templateUrl:'design/watchlists/template/rfieldwatchlistdialogueentervalue.html',
            targetEvent: ev,
          });
        }
        $scope.showAdd();
      }
      else if (item.value=="constants") {
        $scope.showAdd = function(ev) {
          $mdDialog.show({
            controller:'DialogControllerwatchlist',
            //@TODO
            templateUrl:'/design/watchlists/template/rfieldwatchlistdialogueconstants.html',
            targetEvent: ev,
          });
        }
        $scope.showAdd();
      }
      else if (item.value=="function") {
        $scope.showAdd = function(ev) {
          $mdDialog.show({
            controller:'DialogControllerwatchlist',
            //@TODO
            templateUrl:'/design/watchlists/template/rfieldwatchlistdialoguefunction.html',
            targetEvent: ev,
          });
        }
        $scope.showAdd();
      }
      else if (item.value=="historic data") {
        $scope.showAdd = function(ev) {
          $mdDialog.show({
            controller:'DialogControllerwatchlist',
            //@TODO
            templateUrl:'/design/watchlists/template/rfieldwatchlistdialoguehistoricdata.html',
            targetEvent: ev,
          });
        }
        $scope.showAdd();
      }
    }
  }
  function loadAll() {
    var allStates = 'Data field from namespace, Input your own Value, Constants, Function, Accumulate, Historic Data';
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
}]);
