angular.module("tattva")
.controller('AccumulateCtrl',['$scope','$mdDialog','fieldData','loadExprData',function($scope,$mdDialog,fieldData,loadExprData)
{
var functionOption=loadExprData.getFunction().then(function(response){var data=response.data;return data}).then(function(data){
   $scope.functioName=[];
    for(i in data)
    {
      $scope.functioName.push(data[i].fun_name)
    }
    ;}
  );
  $scope.fieldData=fieldData;
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
    return "Accumulate(@"+$scope.fieldData.AccumulateOn+"("+$scope.fieldData.AccumulateTill+").then("+$scope.fieldData.FunctionenPostAccumulation+"("+$scope.fieldData.FunctionenPostAccumulationParam+"))" ;
  }

}]);

<!--end of accumulator ctrl-->
angular.module("tattva")
.controller('DataFieldsCtrl',['$scope','$mdDialog','fieldData','fieldData2','loadExprData',function($scope,$mdDialog,fieldData,fieldData2,loadExprData)
{
  $scope.fieldData=fieldData;
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
    return $scope.fieldData.DataField;
  }

  $scope.DataField=[];
  loadExprData.getDataFields(fieldData2.namespace).then(function(response){var data=response.data;
  return data
  }).then(function(data){
  for(i in data.dataformat)
  $scope.DataField.push(data.dataformat[i].fieldName);
  })

}]);

<!--end of DataFieldsCtrl ctrl-->

angular.module("tattva")
.controller('ConstantCtrl',['$scope','$mdDialog','fieldData','loadExprData',function($scope,$mdDialog,fieldData,loadExprData)
{
$scope.constantOption=loadExprData.getConstants();
console.log($scope.constantOption);
  $scope.getExprAsText =function(){
  return ""+$scope.fieldData.Constants;  // logic for converting the data to human redable easy format of the expression
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
  $scope.function=loadExprData.getFunction().then(function(response){var data=response.data;return data}).then(function(data){
       $scope.functioName=[];
      for(i in data)
      {
        $scope.functioName.push(data[i].fun_name)
      }
      ;}
    );
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
 return $scope.fieldData.inputvalue;
  }

}]);
