angular.module('tattva')
.directive('watchwidget', function() {
  return{
    restrict : 'E',
    transclude: true,
    scope: {
      watchdefn:'<watchdefn',
      eventobj:'<eventobj'
    },
    templateUrl : "/design/watchlists/template/WatchListResultWidget.html"
  };
});
