angular.module('tattva')
.controller("orgWatchlistsCtrl",['$scope','$http','$stateParams','adminFactory',
function($scope, $http, $stateParams,adminFactory) {
  var orgSite = $stateParams.orgSite;
  var selection = "";
  if($stateParams.orgSite!=null){
    selection += $stateParams.orgSite;
    if($stateParams.namespace!=null){
      selection = selection + ">" +$stateParams.namespace;
      if($stateParams.datasource!=null){
        selection = selection + ">" + $stateParams.datasource;
        if($stateParams.stream!=null){
          selection = selection + ">" + $stateParams.stream;
        }
      }
    }
  }
  $scope.selection = selection;

  console.log("$stateParams",$stateParams,"orgSite",orgSite);
  adminFactory.getWatchlists(orgSite).then(function(res){
    console.log("response watches:",res.data);
    $scope.watches = res.data;
    if($stateParams.namespace!=null){
      //filter on namespace
      $scope.watches = filterOnNamespace($scope.watches,$stateParams.namespace);
      if($stateParams.datasource!=null){
        // filter on datasource
        // $scope.watches = filterOnDatasource($scope.watches,$stateParams.datasource);
          if($stateParams.stream!=null){
            //filter on stream
            $scope.watches = filterOnStream($scope.watches,$stateParams.stream);
          }
      }
    }
      function filterOnNamespace(watches,namespace){
        console.log("filtering on namespace");
        var filtered = [];
          for(var i=0;i<watches.length;i++){
            if(watches[i].namespace === namespace)
            filtered.push(watches[i]);
          }
          return filtered;
        }

        function filterOnDatasource(watches,datasource){
          console.log("filtering on datasource");
          var filtered = [];
          for(var i=0;i<watches.length;i++){
            if(watches[i].datasource === datasource)
                filtered.push(watches[i]);
            }
          return filtered;
        }

        function filterOnStream(watches,stream){
          console.log("filtering on stream");
          var filtered = [];
          for(var i=0;i<watches.length;i++){
            if(watches[i].stream === stream)
                filtered.push(watches[i]);
            }
          return filtered;
        }

  },function(res){
    $scope.error = res.data.error;
    console.log("Error in getting watches from server error:",res.data.error);
  });
}]);
