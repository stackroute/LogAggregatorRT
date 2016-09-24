angular.module('tattva')
.controller('historicDataCtrl',['$scope','$mdDialog','$filter',function($scope,$mdDialog,$filter){
	$scope.focusinControl = {};
	$scope.showHistoricData = function(){
		if($scope.fromDate == undefined || $scope.fromTime == undefined){
			$mdDialog.show(
			$mdDialog.alert()
			.parent(angular.element(document.querySelector('#popupContainer')))
			.clickOutsideToClose(true)
			.title('Undefined Date!')
			.textContent('Please Select Date & Time.')
			.ariaLabel('Select Date')
			.ok('Ok')
			.targetEvent()
			);
		}
		else{
			$scope.HistoricData=1;
		} 
	}
}]);
