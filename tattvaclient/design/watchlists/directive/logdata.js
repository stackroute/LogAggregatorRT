angular.module('tattva').directive('logdata', function(){
  return{
    restrict:'EA',
    // template:'Packets:{{logs.length}}<div ng-repeat="line in logs"><pre>{{$index }} : {{ line | json }}</pre><hr/></div>',
    template:'Packets:{{logs.length}}<div><pre>{{ logs | json }}</pre></div>',
    scope:{
      watchname:"<watchname",
      orgsite: "<orgsite",
      eventobj:"<eventobj",
      configobj:"<configobj"
    },
    link: function(scope, elem, attrs){
      scope.logs = [];
      var eventName = 'watchlist::onResult' + '::' + scope.orgsite + '::' + scope.watchname;
      scope.eventobj.on(eventName, function(data) {
        scope.logs.push(data.logdata);
      });
    }
  };
});
