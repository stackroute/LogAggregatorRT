angular.module('tattva')
.controller('historicfunctionAddCtrl',['$scope', '$stateParams', '$filter','namespaceFactory','historicfunctionsFactory', '$rootScope','$mdDialog','$timeout', '$q', '$log','loadExprData','$http','$mdpDatePicker', '$mdpTimePicker', '$state', function($scope,$stateParams,$filter,namespaceFactory,historicfunctionsFactory,$rootScope,$mdDialog,$timeout, $q, $log,loadExprData,$http,$mdpDatePicker,$mdpTimePicker,$state){

 $scope.fndef={};
 $scope.DataField=[];
 $scope.fndef.condition=[];
 $scope.fndef.requiredData=[];
 $scope.querycriteria=[];
 $scope.outputcriteria=[];
 var j=0,i=0;

 if($stateParams.edithistoricfunctiondata){
  var historicfunctionobject = $stateParams.edithistoricfunctiondata;

  historicfunctionsFactory.gethistoricfunctionsDetails(historicfunctionobject).then(function(data)
  {
        $scope.fndef=data;
        //setting Query time period
        $scope.fromDate=new Date(data.fromDateTime);
        $scope.toDate=new Date(data.toDateTime);
        $scope.fromTime = new Date(moment(data.fromDateTime).format('YYYY-MM-DD')+'T'+moment(data.fromDateTime).format('hh:mm')+':00.000Z');
        $scope.toTime = new Date(moment(data.toDateTime).format('YYYY-MM-DD')+'T'+moment(data.toDateTime).format('hh:mm')+':00.000Z');
        
        //.selectedItemChange(data.watchlist);
  });
}

 $scope.removeExpression=function(index,expr) {
  $scope.querycriteria.splice(index, 1);
  i=i-1;
  for(var k=index;k<$scope.querycriteria.length;k++){
    $scope.querycriteria[k]["index"]=$scope.querycriteria[k].index-1;
  }
  $scope.fndef.condition = $scope.querycriteria;
}

$scope.addNewExpression=function(index,expr) {
  i++;
  queryobject={
    "index":i,
    "lhs":"",
    "operator":"",
    "rhs":"",
    "joinwith":"And"
  };
  $scope.querycriteria.push(queryobject);
  $scope.fndef.condition = $scope.querycriteria;

}

$scope.addOutputExpression= function(){
  j++;
  outputobject={
    "index":j
  };
  $scope.outputcriteria.push(outputobject);
  $scope.fndef.requiredData = $scope.outputcriteria;

}

$scope.removeOutputExpression=function(index,expr) {
  $scope.outputcriteria.splice(index, 1);
  j=j-1;
  for(var k=index;k<$scope.outputcriteria.length;k++){
    $scope.outputcriteria[k]["index"]=$scope.outputcriteria[k].index-1;
  }
  $scope.fndef.requiredData = $scope.outputcriteria;
}

$scope.savehistoricfunction=function(ev) {
  
  $scope.fndef.fromDateTime = $filter('date')(moment($scope.fromDate).format('YYYY-MM-DD')+'T'+moment($scope.fromTime).format('hh:mm')+':00.000Z','yyyy-MM-dd HH:mm:ss Z','+0530');
  $scope.fndef.toDateTime = $filter('date')(moment($scope.toDate).format('YYYY-MM-DD')+'T'+moment($scope.toTime).format('hh:mm')+':00.000Z','yyyy-MM-dd HH:mm:ss Z','+0530');
  
  historicfunctionsFactory.savehistoricfunctions($scope.fndef).then(function(data) {
    historicfunctionsFactory.sethistoricfunctionsDetails($scope.fndef,$scope.fndef.name).then(function(data) {
      console.log(data);
    })
      $mdDialog.show(
      $mdDialog.alert()
      .parent(angular.element(document.querySelector('#popupContainer')))
      .clickOutsideToClose(true)
      .title('Historic Query saved successfully!')
      .ariaLabel('Historic Query saved successfully!')
      .ok('Ok')
      .targetEvent(ev)
      );
    $state.go("design.historicFunction");
  },
  function(data) {
    $scope.error=data.error;
  })
}

$scope.cancelhistoricfunctionadd=function(){
  $state.go("design.historicFunction");
}




}]);
