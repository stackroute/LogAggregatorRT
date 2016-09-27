angular.module("tattva")
  .controller('prevexprrsltctrl', ['$scope', '$mdDialog', 'fieldData', 'fieldData2', 'loadExprData', function($scope, $mdDialog, fieldData, fieldData2, loadExprData) {
    $scope.expression = [];
    for (var i = 0; i < fieldData2.expressions.length - 1; i++) {
      $scope.expression.push(fieldData2.expressions[i]);
    }

    $scope.getExprAsText = function() {
      return "result(" + $scope.fieldData.exprtag + ")";
    }


    $scope.fieldData = fieldData;
    //console.log("dialogueData data within publisherCtrl is : ", $scope.fieldData);
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
