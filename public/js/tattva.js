var tattva = angular.module('tattva', ['ngMaterial', 'ngMdIcons','ui.router','ngLetterAvatar']);
tattva.controller('AppCtrl', ['$scope', '$rootScope',
  function($scope) {
    $scope.operator=['>','<']
    $scope.showmesecound=true;
    $scope.showmefirst=true;
    $scope.namespaces = [{
      "name": "ngnix",
      "dataFields": [{"name": "request method", "field": "method", "type": "dimension"}]
    }, {
      "name": "apache",
      "dataFields": [{"name": "request method", "field": "method", "type": "dimension"}]
    }, {
      "name": "iot-sound",
      "dataFields": [{"name": "request method", "field": "method", "type": "dimension"}]
    }, {
      "name": "iot-temprature",
      "dataFields": [{"name": "request method", "field": "method", "type": "dimension"}]
    }];
    $scope.datastreams = [{
      "name": "ngnix-stream-GET",
      "namespace": "ngnix"
    }, {
      "name": "ngnix-stream-POST",
      "namespace": "ngnix"
    }, {
      "name": "apache-stream-GET",
      "namespace": "apache"
    }, {
      "name": "apache-stream-POST",
      "namespace": "apache"
    }];
//     removestatement:function(){
//     //  console.log($scope.wlstdef.statements);
//     var lastItem = $scope.wlstdef.statements.length-1;
//     console.log(lastItem);
//   //  $scope.statements.splice(lastItem);
// };

    $scope.savewatchlist=function(){
    }
    $scope.wlstdef = {
      statements: [],
      // savejoinby:function('name'){$scope.name=name,console.log($scope.name)},
      removestatement:function(){
        var lastItem = $scope.wlstdef.statements.length-1;
        this.statements.splice(lastItem);
      },
      addNewStatement: function(name) {
        if($scope.showmesecound){
          $scope.showmesecound=false;
        }
        var newStmt = {
          _id: (this.statements.length + 1),
          _joinexpressionBy:name,
          criterias: [],
          addNewClause: function(name) {
            if($scope.showmefirst){
              $scope.showmefirst=false;
            }
            var newClause = {_id: (this.criterias.length + 1),_joinby:name };
            this.criterias.push(newClause);
          },
           removecriterias:function(){
             var lastItem = this.criterias.length-1;
            this.criterias.splice(lastItem);
           }
        }
        this.statements.push(newStmt);
      }
    }
  }
]);

tattva.service('wlstDataService', ['$http', function($http){
    this.getData = function() {
      return $http.get('/fileFetch');
    }
}]);

tattva.config(['$stateProvider','$urlRouterProvider',
  function($stateProvider,$urlRouterProvider) {
    $stateProvider.state('watchlist', {
      url:'/watchlist',
      templateUrl:'/partials/watchlists.html'
    })
    .state('watchlist.create', {
      url:'/new',
      views: {
        "@" : {
          templateUrl:'/partials/newwatchlist.html',
          controller: 'AppCtrl'
              }
      }
    });
}]);
