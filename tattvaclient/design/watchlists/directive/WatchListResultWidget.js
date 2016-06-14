angular.module('tattva').directive('watchlistresultwidget', function() {
  var directive = {};
  directive.restrict = 'E';
  directive.templateUrl = "/design/watchlists/template/WatchListResultWidget.html";
  // directive.link = function(scope, elem, attr) {
  //   elem.getElementById('graphTab').appendchild('<mygraph type=scope.myresult.charttype></mygraph>');
  // }
  // directive.controller = function($scope) {
  //   $scope.getChartTemplate = function() { return "/partials/" + $scope.myresult.charttype + ".html"; }
  // };
  directive.scope = {
    myresult: '=result',
    mylog:'=data',
    watchdata:'=watchlistdata'
  }

  return directive;
});
