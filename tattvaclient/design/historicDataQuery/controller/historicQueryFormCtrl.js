angular.module('tattva')
.controller('historicQueryFormCtrl',['$scope', '$stateParams', '$filter','namespaceFactory','historicQueryFactory', '$rootScope','$mdDialog','$timeout', '$q', '$log','loadExprData','$http','$mdpDatePicker', '$mdpTimePicker', '$state', function($scope,$stateParams,$filter,namespaceFactory,historicQueryFactory,$rootScope,$mdDialog,$timeout, $q, $log,loadExprData,$http,$mdpDatePicker,$mdpTimePicker,$state){

	$scope.fndef={};
	$scope.fndef.queryCriteria=[];
	$scope.fndef.outputFields=[];
	$scope.edit=false;
	$scope.view=false;
	
	if($stateParams.editHistoricQueryData){
		var historicQueryObject = $stateParams.editHistoricQueryData;
		if(! $stateParams.view){
			$scope.edit=true;	
		}else{
			$scope.view=true;
		}
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
			$mdDialog.show(
				$mdDialog.alert()
				.parent(angular.element(document.querySelector('#popupContainer')))
				.clickOutsideToClose(true)
				.title('Invalid Data!')
				.textContent(data.message)
				.ariaLabel('Historic Query Creation unsuccessfully Terminated!')
				.ok('Ok')
				.targetEvent(ev)
				);
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
			$mdDialog.show(
				$mdDialog.alert()
				.parent(angular.element(document.querySelector('#popupContainer')))
				.clickOutsideToClose(true)
				.title('Historic Query updation Failed!')
				.ariaLabel('Historic Query updation Failed!')
				.textContent(data.message)
				.ok('Ok')
				.targetEvent(ev)
				);
		})
	}

	$scope.test = function() {
		$scope.isQuery2='false';
		$scope.isQuery3='false';
		var query1 = "use "+$scope.fndef.orgsite+"_historic;"; // query for switch to required database
		if($scope.fndef.watchlist != undefined){
			var collection = $scope.fndef.watchlist.replace(/\s+/g, '_').toLowerCase()+"_outcomes";
		}
		var groupAggregate = {_id : "$orgsite"};
		var nonAggregate = {};
		for(field in $scope.fndef.outputFields){
			if($scope.fndef.outputFields[field].function != undefined){
				$scope.isQuery2='true';
				var dbFunction = getDBFunction($scope.fndef.outputFields[field].function);
				var functionResult1 = $scope.fndef.outputFields[field].function.toLowerCase();
				for(dataField in $scope.fndef.outputFields[field].dataFields){
					var functionResult2 = $filter('capitalize')($scope.fndef.outputFields[field].dataFields[dataField]);
					var functionResult = functionResult1+functionResult2;
					var functionObj = {};
					functionObj[dbFunction] = "$data."+$scope.fndef.outputFields[field].dataFields[dataField];
					groupAggregate[functionResult] = functionObj;
				}
			}
			else{
				$scope.isQuery3='true';
				for(dataField in $scope.fndef.outputFields[field].dataFields){
					var functionResult = $scope.fndef.outputFields[field].dataFields[dataField];
					nonAggregate[functionResult]=1;
				}
			}
		}
		$scope.fndef.fromDateTime = $filter('date')(moment($scope.fromDate).format('YYYY-MM-DD')+'T'+moment($scope.fromTime).format('HH:mm:ss')+'.000Z','yyyy-MM-dd HH:mm:ss Z','+0000');
		$scope.fndef.toDateTime = $filter('date')(moment($scope.toDate).format('YYYY-MM-DD')+'T'+moment($scope.toTime).format('HH:mm:ss')+'.000Z','yyyy-MM-dd HH:mm:ss Z','+0000');		
		var timeIn = [$scope.fndef.fromDateTime,$scope.fndef.toDateTime];
		var matchObject = {"data.commitDateTime" : {$in : timeIn}};
		setQueryTime();
		for(criteria in $scope.fndef.queryCriteria){
			var comparisonFunction = getComparisonFunction($scope.fndef.queryCriteria[criteria].operator);
			var comparisonObject = {};
			comparisonObject[comparisonFunction] = "data."+$scope.fndef.queryCriteria[criteria].rhs.value;
			matchObject["data."+$scope.fndef.queryCriteria[criteria].lhs] = comparisonObject;			
		}

		var query2 = "db."+collection+".aggregate([{$group:"+$filter('json')(groupAggregate)+"}])";
		var query3 = "db."+collection+".find("+$filter('json')(matchObject)+","+$filter('json')(nonAggregate)+")";
		
		$scope.query1= query1;// console.log("query1",query1);
		$scope.query2= query2;// console.log("query2",query2);
		$scope.query3= query3;// console.log("query3",query3);
	}

	getDBFunction = function(fnName){
		if(fnName === 'AVERAGE'){
			return '$avg';
		}
		if(fnName === 'SUM'){
			return '$sum';
		}
		if(fnName === 'FIRST'){
			return '$first';
		}
		if(fnName === 'LAST'){
			return '$last';
		}
		if(fnName === 'MAXIMUM'){
			return '$max';
		}
		if(fnName === 'MINIMUM'){
			return '$min';
		}
		if(fnName === 'STANDARD DEVIATION'){
			return '$stdDevSamp';
		}
	}

	getComparisonFunction = function(fnName){
		if(fnName === '=='){
			return '$eq';
		}
		if(fnName === '!='){
			return '$ne';
		}
		if(fnName === '>='){
			return '$gte';
		}
		if(fnName === '>'){
			return '$gt';
		}
		if(fnName === '<'){
			return '$lt';
		}
		if(fnName === '<='){
			return '$lte';
		}
		if(fnName === 'like'){
			return '$elemMatch';
		}
		if(fnName === 'exists'){
			return '$exists';
		}
	}

}]);
