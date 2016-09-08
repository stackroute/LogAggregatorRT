angular.module('tattva')
.directive('tattvaHistQQueryCriteriaLeftField', function() {
	return{
		restrict: 'E',
		transclude: true,
		scope: {
			criteria:"<criteria"
		},
		controller : function($scope,$stateParams,$mdDialog,$timeout, $q, $log,namespaceFactory) {

			var self = this;
			self.simulateQuery = false;
			self.isDisabled    = false;
			self.dataFields       = loadAll();
			self.querySearch   = querySearch;
			self.selectedItemChange = selectedItemChange;
			self.searchTextChange   = searchTextChange;

			if ($stateParams.editHistoricQueryData) {
				self.selectedItem = $scope.criteria.lhs;
			}

			function querySearch (query) {
				var results = query ? "self.namespaceOption.filter( createFilterFor(query) )" : self.dataFields,
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
				$log.info('Item changed to ' + JSON.stringify(item));
				if(item!=undefined)
				{
					criteria.lhs=item;
				}
			}

			function loadAll() {
				var streamData=[];
				$scope.$watch('fndef.watchlist',function(){
					if(streamData.length!=0)
					{
						streamData.splice(0,streamData.length);
					}
					if(typeof($scope.$parent.fndef.namespace)=="undefined") return;
					var dataSchema=namespaceFactory.getNamespaceDetails($scope.$parent.fndef.namespace).then(function(data) {
						var dataSchema = data.dataSchema;
						for(i in dataSchema) {
							streamData.push(dataSchema[i].name);
						}
					}, function(res) { $scope.error = res.data.error; })
				}
				);

				return streamData;
			}

			function createFilterFor(query) {
				var lowercaseQuery = angular.lowercase(query);
				return function filterFn(namespaceOption) {
					return (dataFields.name.indexOf(lowercaseQuery) === 0);
				};
			}
		},
		controllerAs:'tattvaHistQQueryCriteriaLeftFieldctrl',
		templateUrl: "design/historicDataQuery/directive/tattvaHistQQueryCriteriaLeftField/tattvaHistQQueryCriteriaLeftField.html"
	};
});