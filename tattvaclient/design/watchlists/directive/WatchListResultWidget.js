angular.module('tattva')
.directive('watchwidget', function(AuthService) {
  return{
    restrict : 'E',
    scope: {
      watchdefn:'<watchdefn',
      eventobj: '<eventobj'
    },
    templateUrl : "/design/watchlists/template/WatchListResultWidget.html",
    // controller:['$scope', 'AuthService',
    // function($scope, AuthService) {
    //   var usr = AuthService.getCurrentUser();
    //   var roomName = usr.orgsite + "::" + $scope.watchdefn.name;
    //   $scope.socket = io();
    //   $scope.socket.emit('join:room', {
    //     'room':roomName
    //   });
    //   $scope.$on('$destroy', function(){
    //     if($scope.socket) {
    //       $scope.socket.emit('leave:room', {
    //         'room': roomName
    //       });
    //       $scope.socket.disconnect();
    //       delete $scope.socket;
    //       $scope.socket = null;
    //     }
    //   });
    // }]
  };
});
