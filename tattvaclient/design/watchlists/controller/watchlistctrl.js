angular.module("tattva")
.controller('WatchListCtrl', ['$scope','$http', '$rootScope','$mdDialog','$timeout', '$q', '$log',"$state",
function( $scope,$http,$rootScope,$mdDialog,$timeout, $q, $log,$state) {
$scope.wlstdef = {
  namespace:{},
  stream:{},
  expressions: [],
  publisher:[]
};
  $scope.removeExpression=function(index) {
    $scope.wlstdef.expressions.splice(index,1);
  }

  $scope.addNewExpression=function(index) {
      $scope.index = 0;
      console.log(index);

      if(isNaN(index)){
        $scope.index = $scope.wlstdef.expressions.length;
      }
      else{
        console.log("index= ", index);
        $scope.index = index+1;
      }
      console.log('  $scope.index = ',   $scope.index );

      var newExpr = {
        "tag": ("tag::" + ($scope.wlstdef.expressions.length + 1)),
        "joinWith": "",
        "joinBy": "",
        "inputStream" : "",
        "watch": {
          "lfield": {
            "fieldType":"",
          },
          "rfield": {
            "fieldType":"",
          }
        },
      };
      $scope.wlstdef.expressions.splice($scope.index,0,newExpr);
      $scope.wlstdef.expressions.joinwith = $scope.index;
    }
$scope.savewatchlist=function()
{
  console.log("hi");

}
}
]);
