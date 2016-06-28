angular.module('tattva')
.directive('watchwidget', function(AuthService) {
  return{
    restrict : 'E',
    scope: {
      watchdefn:'<watchdefn',
      eventobj:'<eventobj'
    },
    templateUrl : "/design/watchlists/template/WatchListResultWidget.html"
  };
});
