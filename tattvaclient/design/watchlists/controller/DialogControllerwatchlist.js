angular.module("tattva")
.controller('DialogControllerwatchlist',['$scope','$mdDialog','fieldData',function($scope,$mdDialog,fieldData)
{
console.log("hieeeeeeeee",$scope.fieldData);
  $scope.fieldData=fieldData;
  // console.log("dialogueData data within publisherCtrl is : ",fieldData);
  $scope.hide = function() {
    $mdDialog.hide();
  };

  $scope.updateBackPublisher = function() {
    $scope.fieldData.exprAsText = $scope.getExprAsText();
    $mdDialog.hide($scope.fieldData);
  };

  $scope.cancel = function() {
    $mdDialog.cancel();
  };

  $scope.getExprAsText=function() {
    // logic for converting the data to human redable easy format of the expression
  }

}]);


<!--end of DialogControllerwatchlist ctrl-->

angular.module("tattva")
.controller('AccumulateCtrl',['$scope','$mdDialog','fieldData','loadExprData',function($scope,$mdDialog,fieldData,loadExprData)
{
$scope.function=loadExprData.getFunction();
  $scope.fieldData=fieldData;
  console.log("dialogueData data within publisherCtrl is : ", $scope.fieldData);
  $scope.hide = function() {
    $mdDialog.hide();
  };

  $scope.updateBackPublisher = function() {
    $scope.fieldData.exprAsText = $scope.getExprAsText();
    $mdDialog.hide($scope.fieldData);
  };

  $scope.cancel = function() {
    $mdDialog.cancel();
  };

  $scope.getExprAsText=function(){
    return "Accumulate(By "+$scope.fieldData.accumulatecriteria+" for "+$scope.fieldData.accumulatorvalue+" Where "+$scope.fieldData.accumulatecondition  + " and Execute "+$scope.fieldData.accumulatorfunctionend+" after Accumulating)";
  }

}]);


<!--end of accumulator ctrl-->
angular.module("tattva")
.controller('DataFieldsCtrl',['$scope','$mdDialog','fieldData',function($scope,$mdDialog,fieldData)
{
  $scope.fieldData=fieldData;
  console.log("dialogueData data within publisherCtrl is : ", $scope.fieldData);
  $scope.hide = function() {
    $mdDialog.hide();
  };

  $scope.updateBackPublisher = function() {
    $scope.fieldData.exprAsText = $scope.getExprAsText();
    $mdDialog.hide($scope.fieldData);
  };

  $scope.cancel = function() {
    $mdDialog.cancel();
  };
//@Todo
  $scope.getExprAsText=function() {
    return "DataField";
  }

}]);

<!--end of DataFieldsCtrl ctrl-->

angular.module("tattva")
.controller('ConstantCtrl',['$scope','$mdDialog','fieldData','loadExprData',function($scope,$mdDialog,fieldData,loadExprData)
{
$scope.constantOption=loadExprData.getConstants();
console.log($scope.constantOption);
  $scope.getExprAsText =function(){
  return "Constant:"+$scope.fieldData.Constants;  // logic for converting the data to human redable easy format of the expression
  }
  $scope.fieldData=fieldData;
  console.log("dialogueData data within publisherCtrl is : ", $scope.fieldData);
  $scope.hide = function() {
    $mdDialog.hide();
  };

  $scope.updateBackPublisher = function() {
    $scope.fieldData.exprAsText = $scope.getExprAsText();
    $mdDialog.hide($scope.fieldData);
  };

  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  return "Constant:"+$scope.fieldData.Constant  // logic for converting the data to human redable easy format of the expression

}]);

<!--end of ConstantCtrl ctrl-->
angular.module("tattva")
.controller('FunctionCtrl',['$scope','$mdDialog','fieldData','loadExprData',function($scope,$mdDialog,fieldData,loadExprData)
{
  $scope.function=loadExprData.getFunction();
  $scope.getExprAsText =function(){
  return $scope.fieldData.function+"("+$scope.fieldData.functionparam+")";

  }
  $scope.fieldData=fieldData;
  console.log("dialogueData data within publisherCtrl is : ", $scope.fieldData);
  $scope.hide = function() {
    $mdDialog.hide();
  };

  $scope.updateBackPublisher = function() {
    $scope.fieldData.exprAsText = $scope.getExprAsText();
    $mdDialog.hide($scope.fieldData);
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };

}]);


<!--end of FunctionCtrl ctrl-->

angular.module("tattva")
.controller('HistoricDataCtrl',['$scope','$mdDialog','fieldData',function($scope,$mdDialog,fieldData)
{
  $scope.fieldData=fieldData;
  console.log("dialogueData data within publisherCtrl is : ", $scope.fieldData);
  $scope.hide = function() {
    $mdDialog.hide();
  };

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

angular.module("tattva")
.controller('InputValueCtrl',['$scope','$mdDialog','fieldData',function($scope,$mdDialog,fieldData)
{
  $scope.fieldData=fieldData;
  console.log("dialogueData data within publisherCtrl is : ", $scope.fieldData);
  $scope.hide = function() {
    $mdDialog.hide();
  };

  $scope.updateBackPublisher = function() {
    $scope.fieldData.exprAsText = $scope.getExprAsText();
    $mdDialog.hide($scope.fieldData);
  };

  $scope.cancel = function() {
    $mdDialog.cancel();
  };

  $scope.getExprAsText =function(){
 return "Value: "+$scope.fieldData.watchlistdialogvalue;
  }

}]);


// <!--end of HistoricDataCtrl ctrl-->
//
// angular.module("tattva")
// .controller('DialogControllerwatchlist2',['$scope','$mdDialog','fieldData',function($scope,$mdDialog,fieldData)
// {
//   console.log("dialogueData data within publisherCtrl is : ", $scope.dialogueData2);
//   $scope.fieldData=fieldData;
//
//   $scope.hide = function() {
//     $mdDialog.hide();
//   };
//
//   $scope.updateBackPublisher = function() {
//     $mdDialog.hide($scope.fieldData);
//   };
//
//   $scope.cancel = function() {
//     $mdDialog.cancel();
//   };
//
// }]);
