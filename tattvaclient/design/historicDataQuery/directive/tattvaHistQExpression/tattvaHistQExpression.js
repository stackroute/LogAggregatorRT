angular.module('tattva')
.directive('tattvaHistQExpression', function() {
	return{
		restrict: 'E',
		transclude: true,
		scope: {
			field : "<field"
		},
		templateUrl: "design/historicDataQuery/directive/tattvaHistQExpression/tattvaHistQExpression.html"
	};
});