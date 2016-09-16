  angular.module('tattva')
  .controller('functionCreateCtrl', ['$scope', '$http','loadExprData',"functionFactory","$state",'$mdDialog',"functionFactory",
    function($scope, $http, loadExprData,functionFactory,$state,$mdDialog) {

      $scope.function=[]; 
      loadExprData.getFunction().then(function(result){
        var data=result.data;
        return data;
      }).then(function(data)
      {
        for(i in data)
        {
          $scope.function.push(data[i]);
        }
      });

      $scope.loadFunctionData = function(){
        $scope.functionData = {
          "name":"",
          "description": "",
          "parameters":[],
          "returnresult":"",
          "expression": []
        }

      };

      $scope.parameters = [{id: 'parameter1'}];
      $scope.removeExpr=function(index){
       $scope.functionData.expression.splice(index,1);
       for(i in $scope.functionData.expression)
       {
        var j=i;
        j++;
        $scope.functionData.expression[i].tag=("Expression::"+j);
      }
    };

    $scope.addNewExpr=function () {
      var newExpr={
        "tag":("Expression::"+($scope.functionData.expression.length + 1)),
        "lhs":{
          "type":"function",
          "name":"",
          "varmap": [
          { 
           "srcvar": "",
           "targetvar": ""
         },
         { 
           "srcvar": "",
           "targetvar": ""
         }
         ]
       },
       "operator": {
        "type": "operator",
        "name": ""
      },
      "rhs":{
        "type":"function",
        "name":"",
        "varmap": [
        { 
         "srcvar": "",
         "targetvar": ""
       },
       { 
         "srcvar": "",
         "targetvar": ""
       }
       ]
     },
     "join_By":{
      "type":"operator",
      "name":""
    }
  };  
  $scope.functionData.expression.push(newExpr);
};
$scope.addNewParam = function() {
 var newItemNo = $scope.parameters.length+1;
 $scope.parameters.push({'id':'parameter'+newItemNo});
};
$scope.functionCancel = function(){
  $state.go("design.function");
}
$scope.create=function () { 
 functionFactory.saveFunction($scope.functionData)
 .then(function(data) {
          //success
          

          $mdDialog.show(
            $mdDialog.alert()
            .parent(angular.element(document.body))
            .clickOutsideToClose(true)
            .title('FUNCTION SAVED SUCCESSFULLY!')
            .ariaLabel('Alert Dialog ')
            .ok('OK')
            );
          
          $state.go("design.function");
        },
        function(data) {
          $scope.error=data.error;
        })
}
$scope.removeParam = function() {
 var lastItem = $scope.parameters.length-1;
 $scope.parameters.splice(lastItem);
};
$scope.openDialogBox = function(eve,object,side,index) {
  $scope.functionData.parameters=$scope.parameters;
  $mdDialog.show({
    controller: DialogController,
    templateUrl: '/design/functions/template/createFunctionDialog.html',
    locals: {
     parameters: $scope.parameters,
     object:object,
     keys:object
   },
   parent: angular.element(document.body),
   targetEvent: eve,
   clickOutsideToClose:true,
 })
  .then(function(answer) {
   $scope.functionData.expression[index][side].varmap=answer;
 }, function() {
 });
 // $scope.functionData.expression=$scope.newExpr;
};

$scope.getExprAsText =function(){
  /*return $scope.fieldData.function+"("+$scope.fieldData.functionparam+")";*/
}
function DialogController($scope, $mdDialog, parameters,object) {
  $scope.keys=[];
  $scope.obj={};
  var varmap1=[];
  var comma=object.variables.split(",");
  for(i in comma)
  {
    var param={};
    param.value=comma[i].split(" ")[1];
    param.id=i;
    $scope.keys.push(param);
  }
  $scope.parameters = parameters;
  $scope.closeDialog = function() {
    $mdDialog.hide();
  }
  $scope.save=function () {
   for(i in $scope.keys)
   {
     varmap1.push({'srcvar':$scope.keys[i].value,'targetvar':"" })
   }
   var j=0;
   /* var keys =Object.keys($scope.obj);*/
   for(var key in $scope.obj)
   {
    varmap1[j].targetvar=$scope.obj[key];
    j++;
  }
  $mdDialog.hide(varmap1);
}
$scope.cancel = function() {
  $mdDialog.cancel();
};
};
}])