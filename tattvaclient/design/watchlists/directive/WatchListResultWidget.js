angular.module('tattva')
.directive('watchwidget', function() {
  return{
    restrict : 'E',
    scope: {
      watchdefn:'<watchdefn',
      eventobj:'<eventobj'
    },
    templateUrl : "/design/watchlists/template/WatchListResultWidget.html"
  };
});
