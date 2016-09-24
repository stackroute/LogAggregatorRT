angular.module('tattva').directive('logdata', function($interval) {
  return {

    restrict: 'EA',
    // template:'Packets:{{logs.length}}<div ng-repeat="line in logs"><pre>{{$index }} : {{ line | json }}</pre><hr/></div>',
    // template: 'Packets:{{logs.length}}<div><pre>{{ logs | json | logDataFilter}}</pre></div>',
    //It will highlight anomaly on Log data tab
    template: 'Packets:{{logs.length}}<md-button style="position:fixed;" class="md-fab md-mini md-fab-top-right" aria-label="Content Copy" ngclipboard data-clipboard-action="copy" data-clipboard-target="#copying"><md-icon class="material-icons">content_copy</md-icon></md-button><div id="copying"><p ng-repeat="data in logs" ng-style=\'(data.watchresult)?{color:"red"}:{color:"blue"}\'>{{ data | json }}</p></div>',

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
        // console.log("Data from server: ", data);
        logData.push(data);
        if (logData.length > maxData) {
          logData.shift();
        }
      });

    }
  }

});
