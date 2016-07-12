angular.module('tattva').directive('linearChart', function($interval){
  return{
    restrict:'EA',
    template:'<div id="container"></div>',
    scope:{
      watchname:"<watchname",
      orgsite: "<orgsite",
      eventobj:"<eventobj",
      configobj:"<configobj"
    },
    link: function(scope, elem, attrs){
      var graphData = [];

      var graphLineColor = "#0000b3";

      var xattr=scope.configobj.xaxis;
      var yattr=scope.configobj.yaxis;
      var xattrValue=xattr.replace(/([A-Z]+)*([A-Z][a-z])/g, "$1 $2").toUpperCase();
      var yattrValue=yattr.replace(/([A-Z]+)*([A-Z][a-z])/g, "$1 $2").toUpperCase();
      var parsedDate=null;

      //Generate a unique ID for each graph div, so that data is not mixed up and each graph is plotted/updated individually
      var chartElemId = 'cntr-' + scope.watchname.replace(/\s+/g, '-').toLowerCase();
      var cntr = angular.element('<div id="' + chartElemId + '"></div>');
      elem.append(cntr);

      var chart = new CanvasJS.Chart(chartElemId,{
        title :{
          text: ""
        },
        axisX: {
          valueFormatString: "DD-MMM" ,
          title: xattrValue
        },
        axisY: {
          title: yattrValue
        },
        data: [{
          type: "line",
          color: graphLineColor,
          dataPoints : graphData
        }]
      });
      // chart.render();

      var updateChart = function () {
        chart.render();
      };

      $interval(function(){
        updateChart();
      }, 2000);

      var eventName = 'watchlist::onResult' + '::' + scope.orgsite + '::' + scope.watchname;
      scope.eventobj.on(eventName, function(data) {
        var date = new Date(data.logdata[xattr]);
        parsedDate = new Date(date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        date.getUTCHours(),
        date.getUTCMinutes(),
        date.getUTCSeconds());
        graphData.push({x:parsedDate,y:data.logdata[yattr]});
        //updateChart();
      });

    }
  };
});
