angular.module("tattva")
.controller('requiredfieldsoptionctrl',['$scope', '$rootScope','$mdDialog','$timeout', '$q', '$log','loadExprData','historicfunctionconfg', function($scope,$rootScope,$mdDialog,$timeout, $q, $log,loadExprData,historicfunctionconfg) {

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
  
  function selectedItemChange(item,index) { 
    if(item!=undefined)
    {
      console.log(index);
      var dialogTemplate = '/design/historicFunctions/requireddataoptions/'+item.template+'/' + item.template+'.html';
      $scope.showDialog = function(ev) {
        $mdDialog.show({
          controller:item.controller,
          templateUrl: dialogTemplate,
          locals:{
            fndef:$scope.$parent.fndef,
            index:index
          },
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: false,
          escapeToClose : false
        }).then(function(response) {

        }, function(response) {

        }).finally(function() {
        });
      };
      $scope.showDialog();

    }
  }

  function loadAll() {
    var requiredfields = historicfunctionconfg.requireddataoption(); 
    return requiredfields;
  }

  function createFilterFor(query) {
    var lowercaseQuery = angular.lowercase(query);
    return function filterFn(requiredfields) {
      return (requiredfields.indexOf(lowercaseQuery) === 0);
    };
  }
}]);
