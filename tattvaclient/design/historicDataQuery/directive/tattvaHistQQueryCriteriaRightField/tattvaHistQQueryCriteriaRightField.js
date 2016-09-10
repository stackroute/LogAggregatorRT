angular.module('tattva')
.directive('tattvaHistQQueryCriteriaRightField', function() {
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
				self.selectedItem = $scope.criteria.rhs.type;
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
				if(item === undefined) return;
				var dialogTemplate = '/design/historicDataQuery/exprFieldsHistoricQuery/'+item.template+'/' + item.template+'.html';

				$scope.showDialog = function(ev) {
					$mdDialog.show({
						controller:item.controller,
						templateUrl: dialogTemplate,
						locals:{
							fndef:$scope.$parent.fndef,
							criteria:criteria
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

			function loadAll() {
				var fieldOptions=historicQueryConfg.getfieldOption();
				return fieldOptions;
			}

			function createFilterFor(query) {
				var lowercaseQuery = angular.lowercase(query);
				return function filterFn(fieldOptions) {
					return (fieldOptions.name.indexOf(lowercaseQuery) === 0);
				};
			}

		},
		controllerAs:'tattvaHistQQueryCriteriaRightFieldctrl',
		templateUrl: "design/historicDataQuery/directive/tattvaHistQQueryCriteriaRightField/tattvaHistQQueryCriteriaRightField.html"
	};
});