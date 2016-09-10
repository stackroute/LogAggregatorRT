angular.module('tattva')
.controller('historicQueryFormCtrl',['$scope', '$stateParams', '$filter','namespaceFactory','historicQueryFactory', '$rootScope','$mdDialog','$timeout', '$q', '$log','loadExprData','$http','$mdpDatePicker', '$mdpTimePicker', '$state', function($scope,$stateParams,$filter,namespaceFactory,historicQueryFactory,$rootScope,$mdDialog,$timeout, $q, $log,loadExprData,$http,$mdpDatePicker,$mdpTimePicker,$state){

	$scope.fndef={};
	$scope.fndef.queryCriteria=[];
	$scope.fndef.outputFields=[];
	$scope.edit=false;

	if($stateParams.editHistoricQueryData){
		var historicQueryObject = $stateParams.editHistoricQueryData;
		$scope.edit=true;
		historicQueryFactory.getHistoricQueryDetails(historicQueryObject).then(function(data)
		{
			$scope.fndef=data;
		//setting Query time period
		$scope.fromDate = new Date(data.fromDateTime);
		$scope.toDate = new Date(data.toDateTime);
		$scope.toDate.setHours($scope.toDate.getHours() + parseInt($scope.toDate.getTimezoneOffset() / 60));
		$scope.toDate.setMinutes($scope.toDate.getMinutes() + $scope.toDate.getTimezoneOffset() / 11);
		$scope.fromDate.setHours($scope.fromDate.getHours() + parseInt($scope.fromDate.getTimezoneOffset() / 60));
		$scope.fromDate.setMinutes($scope.fromDate.getMinutes() + $scope.fromDate.getTimezoneOffset() / 11);
		$scope.toTime=$scope.toDate;
		$scope.fromTime=$scope.fromDate;

		$scope.fndef.outputFields=data.outputFields;
		$scope.fndef.queryCriteria=data.queryCriteria;
	});
	}

	$scope.removeExpression=function(index,expr) {
		$scope.fndef.queryCriteria.splice(index, 1);
	}

	$scope.addNewExpression=function() {
		queryobject={
			"lhs":"",
			"operator":"",
			"rhs":"",
			"joinwith":"And"
		};
		$scope.fndef.queryCriteria.push(queryobject);
	}

	$scope.addOutputExpression= function(){
		outputobject={
		};
		$scope.fndef.outputFields.push(outputobject);
	}

	$scope.removeOutputExpression=function(index,expr) {
		$scope.fndef.outputFields.splice(index, 1);
	}

	$scope.savehistoricfunction=function(ev) {
		setQueryTime();
		historicQueryFactory.saveHistoricQuery($scope.fndef).then(function(data) {
			$mdDialog.show(
				$mdDialog.alert()
				.parent(angular.element(document.querySelector('#popupContainer')))
				.clickOutsideToClose(true)
				.title('Historic Query saved successfully!')
				.ariaLabel('Historic Query saved successfully!')
				.ok('Ok')
				.targetEvent(ev)
				);
			$state.go("design.historicQuery");
		},
		function(data) {
			$scope.error=data.error;
		})
	} 

	var setQueryTime = function(){
		$scope.fndef.fromDateTime = $filter('date')(moment($scope.fromDate).format('YYYY-MM-DD')+'T'+moment($scope.fromTime).format('HH:mm:ss')+'.000Z','yyyy-MM-dd HH:mm:ss Z','+0530');
		$scope.fndef.toDateTime = $filter('date')(moment($scope.toDate).format('YYYY-MM-DD')+'T'+moment($scope.toTime).format('HH:mm:ss')+'.000Z','yyyy-MM-dd HH:mm:ss Z','+0530');
	}

	$scope.cancelhistoricfunctionadd=function(){
		$state.go("design.historicQuery");
	}

	$scope.updateHistoricfunction=function(ev){
		setQueryTime();
		historicQueryFactory.setHistoricQueryDetails($scope.fndef,$scope.fndef.name).then(function(data) {
			$mdDialog.show(
				$mdDialog.alert()
				.parent(angular.element(document.querySelector('#popupContainer')))
				.clickOutsideToClose(true)
				.title('Historic Query updated successfully!')
				.ariaLabel('Historic Query updated successfully!')
				.ok('Ok')
				.targetEvent(ev)
				);
			$state.go("design.historicQuery");
		},
		function(data) {
			$scope.error=data.error;
		})
	}

	// $scope.test = function() {
	// 	setQueryTime();
	// 	var query1 = "use db."+$scope.fndef.orgsite+"_historic;"; // query for switch to required database
	// 	var collection = $scope.fndef.watchlist.replace(/\s+/g, '_').toLowerCase()+"_outcomes";
	// 	var groupAggregate = {};
	// 	for(field in $scope.fndef.outputFields){
	// 		if($scope.fndef.outputFields[field].function != undefined){
	// 			var dbFunction = getDBFunction($scope.fndef.outputFields[field].function);
	// 			var functionResult1 = $scope.fndef.outputFields[field].function.toLowerCase();
	// 			for(dataField in $scope.fndef.outputFields[field].dataFields){
	// 				var functionResult2 = $filter('capitalize')($scope.fndef.outputFields[field].dataFields[dataField]);
	// 				var functionResult = functionResult1+functionResult2;
	// 				var functionObj = {};
	// 				functionObj[dbFunction] = "$"+$scope.fndef.outputFields[field].dataFields[dataField];
	// 				groupAggregate[functionResult] = functionObj;
	// 			}
	// 		}
	// 		else{
	// 			for(dataField in $scope.fndef.outputFields[field].dataFields){
	// 				var functionResult = $scope.fndef.outputFields[field].dataFields[dataField];
	// 				groupAggregate[functionResult]=$scope.fndef.outputFields[field].dataFields[dataField];
	// 			}
	// 		}
	// 	}
	// 	var query2 = "db."+collection+".aggregate([{$group:"+$filter('json')(groupAggregate)+"}])";
	// 	console.log(query1);
	// 	console.log(query2);
	// }

	// getDBFunction = function(fnName){
	// 	if(fnName === 'AVERAGE'){
	// 		return '$avg';
	// 	}
	// 	if(fnName === 'SUM'){
	// 		return '$sum';
	// 	}
	// 	if(fnName === 'FIRST'){
	// 		return '$first';
	// 	}
	// 	if(fnName === 'LAST'){
	// 		return '$last';
	// 	}
	// 	if(fnName === 'MAXIMUM'){
	// 		return '$max';
	// 	}
	// 	if(fnName === 'MINIMUM'){
	// 		return '$min';
	// 	}
	// 	if(fnName === 'STANDARD DEVIATION'){
	// 		return '$stdDevSamp';
	// 	}
	// }

}]);
