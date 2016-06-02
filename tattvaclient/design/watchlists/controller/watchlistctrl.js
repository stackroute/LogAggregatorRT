angular.module("tattva")
.controller('WatchListCtrl', ['$scope','$http', '$rootScope','$mdDialog','$timeout', '$q', '$log',"$state",'loadExprData','saveToDB',
function( $scope,$http,$rootScope,$mdDialog,$timeout, $q, $log,$state,loadExprData,saveToDB) {
$scope.wlstdef = {
  namespace:"",
  stream:"",
  expressions: [],
  publisher:[]
};
  $scope.removeExpression=function(index) {
    $scope.wlstdef.expressions.splice(index,1);
  }
  $scope.addNewExpression=function(index,expr) {
    var newExpr = {
      "tag": ("tag::" + ($scope.wlstdef.expressions.length + 1)),
      "joinWith":"",
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
    $scope.index = 0;
    loadExprData.getOutcomeOptions().then(function(response){
      $scope.getOutcomeOptions=response;
        console.log($scope.getOutcomeOptions);
});
    if(isNaN(index)){
        $scope.index = $scope.wlstdef.expressions.length;
          console.log($scope.index);
                  if($scope.index!=0)
                {
              console.log("This is the expressions",$scope.wlstdef.expressions[$scope.index-1]);
                      $scope.wlstdef.expressions[$scope.index-1].joinWith="tag::"+($scope.index+1);
                }
            }
      else{
          var current=newExpr;
              current.joinWith=expr.joinWith;
                expr.joinWith=current.tag;
              console.log(expr.joinWith);
          console.log("currentttt",current);
        $scope.index = index+1;
      }
      $scope.wlstdef.expressions.splice($scope.index,0,newExpr);
    }
  $scope.savewatchlist=function()
{
saveToDB.savewatchlistdata($scope.wlstdef);
$state.go("design.watchlist");
}
}
]);
