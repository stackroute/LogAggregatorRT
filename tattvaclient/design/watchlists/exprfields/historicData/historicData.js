
angular.module("tattva")
.controller('HistoricDataCtrl',['$scope','$mdDialog','fieldData','historicQueryFactory',function($scope,$mdDialog,fieldData,historicQueryFactory)
{
  $scope.fieldData=fieldData;
  //console.log("dialogueData data within publisherCtrl is : ", $scope.fieldData);
  $scope.hide = function() {
    $mdDialog.hide();
  };
 var historicData = historicQueryFactory.getHistoricQuery().then(function(response){
      $scope.historiclist = response;
      //console.log(response);
      //return response;
    });
 console.log(historicData);
  $scope.updateBackPublisher = function() {
    $scope.fieldData.exprAsText = $scope.getExprAsText();
    $mdDialog.hide($scope.fieldData);
  };

  $scope.cancel = function() {
    $mdDialog.cancel();
  };

  $scope.getExprAsText =function(){
 return "HistoricQuery("+$scope.fieldData.historicfunction+")";
  }

}]);
