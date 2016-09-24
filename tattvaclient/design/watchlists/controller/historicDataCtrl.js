angular.module('tattva')
.controller('historicDataCtrl',['$scope','$mdDialog','$filter',function($scope,$mdDialog,$filter){
	$scope.focusinControl = {};
	$scope.showHistoricData = function(){
		$scope.HistoricData=1;		
	}
}]);
