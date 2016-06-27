angular.module('tattva').directive('logdata', function($parse, $window){
  return{
    restrict:'EA',
    template:'Packets:{{logs.length}}<div ng-repeat="line in logs"><pre>{{$index }} : {{ line | json }}</pre><hr/></div>',
    scope:{
      eventobj:"<eventobj",
      configobj:"<configobj"
    },
    link: function(scope, elem, attrs){
      scope.logs = [];
      var logBuffer = [];
      var batchSize = 100;
      
      scope.eventobj.on("watchview::orgsite::watchcollection",function(data){
        scope.logs.push(data);
      });
    //   scope.eventobj.on("watchlist::logdata",function(data){
    //     scope.logs.push(data);
    //     /*logBuffer.push(data);
    //     if(logBuffer.length == batchSize) {
    //     console.log("Buffer reached ", logBuffer.length, " : ", scope.logs.length);
    //     // scope.logs = scope.logs.concat(logBuffer);
    //     Array.prototype.push.apply(scope.logs, logBuffer);
    //     logBuffer = [];
    //   }*/
    // });
  }
};
});
