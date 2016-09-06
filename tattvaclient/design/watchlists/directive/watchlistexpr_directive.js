//custom directive for watchlist expression
angular.module('tattva')
    .directive('watchlistexpr', function() {
    return {
        restrict: 'E',
        scope: {
            watchListfrml: "<watch"
        },
        link: function(scope, element, attrs) {
            var watchListfrml = {};
            watchListfrml = scope.watchListfrml.expressions;
        },
        templateUrl: "/design/watchlists/template/watchListExpr.html"
    };
});
