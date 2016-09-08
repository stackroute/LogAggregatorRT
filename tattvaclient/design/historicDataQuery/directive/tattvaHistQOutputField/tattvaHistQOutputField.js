angular.module('tattva')
.directive('tattvaHistQOutputField', function() {
	return{
		restrict: 'E',
		transclude: true,
		scope: {
			field : "<field"
		},
		controller : function($scope,historicQueryFactory,$stateParams,$mdDialog,$timeout, $q, $log,historicQueryConfg) {

			var self = this;
			self.simulateQuery = false;
			self.isDisabled    = false;
			self.options       = loadAll();
			self.querySearch   = querySearch;
			self.selectedItemChange = selectedItemChange;
			self.searchTextChange   = searchTextChange;
	
			if ($stateParams.editHistoricQueryData) {
				self.selectedItem = $scope.field.type;
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

			function selectedItemChange(item,field) { 
				if(item!=undefined)
				{	
					var dialogTemplate = '/design/historicDataQuery/outputDataOptions/'+item.template+'/' + item.template+'.html';
					$scope.showDialog = function(ev) {
						$mdDialog.show({
							controller:item.controller,
							templateUrl: dialogTemplate,
							locals:{
								fndef:$scope.$parent.fndef,
								field:field
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
				var requiredfields = historicQueryConfg.outputDataOption(); 
				return requiredfields;
			}

			function createFilterFor(query) {
				var lowercaseQuery = angular.lowercase(query);
				return function filterFn(requiredfields) {
					return (requiredfields.indexOf(lowercaseQuery) === 0);
				};
			}
		},
		controllerAs:'tattvaHistQOutputFieldctrl',
		templateUrl: "design/historicDataQuery/directive/tattvaHistQOutputField/tattvaHistQOutputField.html"
	};
});