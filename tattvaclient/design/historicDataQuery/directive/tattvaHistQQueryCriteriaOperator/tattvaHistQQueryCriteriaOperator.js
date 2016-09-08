angular.module('tattva')
.directive('tattvaHistQQueryCriteriaOperator', function() {
	return{
		restrict: 'E',
		transclude: true,
		scope: {
			criteria:"<criteria"
		},
		controller : function($scope,$stateParams,$mdDialog,$timeout, $q, $log,historicQueryConfg) {
			var self = this;
			self.simulateQuery = false;
			self.isDisabled    = false;
			self.options       = loadAll();
			self.querySearch   = querySearch;
			self.selectedItemChange = selectedItemChange;
			self.searchTextChange   = searchTextChange;

			if ($stateParams.editHistoricQueryData) {
				self.selectedItem = $scope.criteria.operator;
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
			function selectedItemChange(item,criteria) {  
				if(item!=undefined)
				{
					criteria.operator=item;
				}
			}
			function loadAll() {
				var operator = historicQueryConfg.getoperatorOption(); 
				return operator;
			}
			function createFilterFor(query) {
				var lowercaseQuery = angular.lowercase(query);
				return function filterFn(operator) {
					return (operator.indexOf(lowercaseQuery) === 0);
				};
			}
		},
		controllerAs:'tattvaHistQQueryCriteriaOperatorctrl',
		templateUrl: "design/historicDataQuery/directive/tattvaHistQQueryCriteriaOperator/tattvaHistQQueryCriteriaOperator.html"
	};
});