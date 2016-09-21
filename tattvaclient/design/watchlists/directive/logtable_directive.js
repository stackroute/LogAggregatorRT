angular.module('tattva').directive('logtable', function($interval) {
    return {

        restrict: 'EA',
        templateUrl: "design/watchlists/template/logtable.html",
        scope: {
            watchname: "<watchname",
            orgsite: "<orgsite",
            eventobj: "<eventobj",
            configobj: "<configobj"
        },
        link: function(scope, elem, attrs) {

            scope.logs = [];
            var logData = [];
            var maxData = 300;
            var updateInterval = 2000;

            $interval(function() {

                scope.logs = logData;

            }, updateInterval);

            var eventName = 'watchlist::onResult' + '::' + scope.orgsite + '::' + scope.watchname;
            scope.eventobj.on(eventName, function(data) {

                logData.push(data);

                if (logData.length > maxData) {
                    logData.shift();
                }
            });

        }
    }

});
