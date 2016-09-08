
angular.module("tattva")
.controller('HistoricDataCtrl',['$scope','$mdDialog','fieldData','historicfunctionsFactory',function($scope,$mdDialog,fieldData,historicfunctionsFactory)
{
  $scope.fieldData=fieldData;
  //console.log("dialogueData data within publisherCtrl is : ", $scope.fieldData);
  $scope.hide = function() {
    $mdDialog.hide();
  };
 var historicData = historicfunctionsFactory.gethistoricfunctions().then(function(response){
      $scope.historiclist = response;
      console.log($scope.historiclist);
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
 return $scope.fieldData.historicfunction+"("+$scope.fieldData.historicfunctionparam+")";
  }

}]);
