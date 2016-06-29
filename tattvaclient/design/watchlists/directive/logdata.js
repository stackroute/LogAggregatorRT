<<<<<<< HEAD
angular.module('tattva').directive('logdata', function($parse, $window){
  return{
    restrict:'EA',
    template:'Packets:{{logs.length}}<div ng-repeat="line in logs"><pre>{{$index }} : {{ line | json }}</pre><hr/></div>',
    scope:{
=======
angular.module('tattva').directive('logdata', function(){
  return{
    restrict:'EA',
    // template:'Packets:{{logs.length}}<div ng-repeat="line in logs"><pre>{{$index }} : {{ line | json }}</pre><hr/></div>',
    template:'Packets:{{logs.length}}<div><pre>{{ logs | json }}</pre></div>',
    scope:{
      watchname:"<watchname",
      orgsite: "<orgsite",
>>>>>>> d0fd2f224528df142a1137002af3700304472817
      eventobj:"<eventobj",
      configobj:"<configobj"
    },
    link: function(scope, elem, attrs){
      scope.logs = [];
<<<<<<< HEAD
      var logBuffer = [];
      var batchSize = 100;
      scope.eventobj.on("watchlist::logdata",function(data){
        scope.logs.push(data);
        /*logBuffer.push(data);
        if(logBuffer.length == batchSize) {
        console.log("Buffer reached ", logBuffer.length, " : ", scope.logs.length);
        // scope.logs = scope.logs.concat(logBuffer);
        Array.prototype.push.apply(scope.logs, logBuffer);
        logBuffer = [];
      }*/
    });
  }
};
=======
      var eventName = 'watchlist::onResult' + '::' + scope.orgsite + '::' + scope.watchname;
      scope.eventobj.on(eventName, function(data) {
        scope.logs.push(data.logdata);
      });
    }
  };
>>>>>>> d0fd2f224528df142a1137002af3700304472817
});
