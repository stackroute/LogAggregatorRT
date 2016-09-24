angular.module('tattva')
.directive('historicLinearChart', function($interval, getHistoricData, $filter, $mdDialog) {
	return {
		restrict: 'EA',
		template: '<div id="containerHistoricData"></div>',
		scope: {
			watchname: "<watchname",
			orgsite: "<orgsite",
			configobj: "<configobj",
      control: '='
    },
    link: function(scope, elem, attrs) {
     scope.internalControl = scope.control || {};
     var graphData = [];
     var graphLineColor = "#0000b3";
     var maxData = 300;
     var updateInterval = 1000;
     var xattr = scope.configobj.xaxis;
     var yattr = scope.configobj.yaxis;
     var xattrValue = xattr.replace(/([A-Z]+)*([A-Z][a-z])/g, "$1 $2").toUpperCase();
     var yattrValue = yattr.replace(/([A-Z]+)*([A-Z][a-z])/g, "$1 $2").toUpperCase();
     var parsedDate = null;
     var normalTickColor = "blue";
     var anomalyTickColor = "red";
      //Generate a unique ID for each graph div, so that data is not mixed up and each graph is plotted/updated individually
      var chartElemId = 'cntr-' + scope.watchname.replace(/\s+/g, '-').toLowerCase()+"HistoricData";
      var cntr = angular.element('<div id="' + chartElemId + '"></div>');
      elem.append(cntr);
      // var btn = angular.element('<md-button class="md-fab md-mini md-raised" ng-click=""><md-icon>arrow_back</md-icon></md-button><md-button class="md-fab md-mini md-raised" ng-click=""><md-icon>arrow_forward</md-icon></md-button>'); 
      // elem.append(btn);
      var chart = new CanvasJS.Chart(chartElemId, {
      	zoomEnabled: true,
      	animationEnabled: true,
      	title: {
      		text: ""
      	},
      	axisX: {
      		valueFormatString: "DD-MMM",
      		title: xattrValue,
      		labelAngle: 0,
      		titleFontSize: 12,
      		labelFontSize: 10
      	},
      	axisY: {
      		title: yattrValue,
      		interlacedColor: '#f9f9f9',
      		gridColor: '#d9d9d9',
      		tickColor: "blue",
      		titleFontSize: 12,
      		labelFontSize: 10
      	},
      	data: [{
      		type: "spline",
      		markerSize:8,
      		color: graphLineColor,
      		dataPoints: graphData
      	}]
      });
      //chart.render();

      $interval(function() {
      	chart.render();
      }, updateInterval)

      var historicData=[];
      var fromDateTime = $filter('date')(moment(scope.$parent.fromDate).format('YYYY-MM-DD')+'T'+moment(scope.$parent.fromTime).format('HH:mm:ss')+'.000Z','yyyy-MM-dd HH:mm:ss Z','+0530');
      var obj={};
      obj['dbName']=scope.orgsite+"_historic";
      obj['collName']=scope.watchname.replace(/\s/g, '_').toLowerCase()+ "_outcomes";
      obj['inon']=fromDateTime;

      scope.internalControl.skip = 0;
      scope.internalControl.records=0;
      scope.internalControl.text = "Stop Historic Data"
      scope.internalControl.bColor="";
      scope.internalControl.renderGraph = function(){
        obj['skip']=scope.internalControl.skip;
        getHistoricData.getHistoricData(obj).then(function(data){
          scope.internalControl.records=data.length;
          historicData=data;
          if(!data.length){
          scope.internalControl.bColor="red";
          scope.internalControl.text="STOP!! No Records to show"
        }

         for(data in historicData){
           var date = new Date(historicData[data].data[xattr]);
           parsedDate = new Date(date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate(),
            date.getUTCHours(),
            date.getUTCMinutes(),
            date.getUTCSeconds());

        	//changing the color of anomalies and pushing the data
        	graphData.push({
        		click:onClick,
        		x: parsedDate,
        		y: historicData[data].data[yattr],
        		color: normalTickColor
        	});
          var logData= $filter('json')(historicData[data].data);
        	function onClick(){
        		$mdDialog.show(
              $mdDialog.alert()
              .parent(angular.element(document.querySelector('#popupContainer')))
              .clickOutsideToClose(false)
              .title('Log Data')
              .textContent(logData)
              .ariaLabel('Data Object')
              .ok('Ok')
              .targetEvent()
              );
        	}
        	if (historicData[data].path.watchresult) {
        		normalTickColor = 'blue';
        	} else {
        		normalTickColor = anomalyTickColor;
        	}
        	//prune excess data, no point in keeping it accumulated
        	if (graphData.length > maxData) {
        		graphData.shift();
        	}
        	//updateChart();
        }

      });
      }
      scope.internalControl.renderGraph();
    }
  }
});
