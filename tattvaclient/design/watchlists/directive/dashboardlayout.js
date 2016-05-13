angular.module('tattva').directive('dashboardlayout', function() {
  var directive = {};
  directive.restrict = 'E';
  directive.templateUrl = "/design/watchlists/template/dashboardlayout.html";
  // directive.link = function(scope, elem, attr) {
  //   console.log("From dashboardlayout link function: " , scope.myresult.charttype);
  //   elem.getElementById('graphTab').appendchild('<mygraph type=scope.myresult.charttype></mygraph>');
  // }
  // directive.controller = function($scope) {
  //   $scope.getChartTemplate = function() { return "/partials/" + $scope.myresult.charttype + ".html"; }
  // };
  directive.scope = {
    myresult: '=result',
    mylog:'=data'
  }

  return directive;
});
