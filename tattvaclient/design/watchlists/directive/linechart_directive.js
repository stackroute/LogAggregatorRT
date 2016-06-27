angular.module('tattva').directive('linearChart', function($parse, $window){
  return{
    restrict:'EA',
    template:"<svg width='1070' height='200'></svg>",
    scope:{
      eventobj:"<eventobj",
      configobj:"<configobj"
    },
    link: function(scope, elem, attrs){
      console.log("LineChart");
      var graphData = [];
      // var exp = $parse(attrs.chartData);
      var xattr=scope.configobj.xaxis;
      var yattr=scope.configobj.yaxis;
      console.log("xattr:",xattr);
      console.log("yattr:",yattr);
      // var salesDataToPlot=exp(scope);
      var padding = 20;
      var pathClass="path";
      var xScale, yScale, xAxisGen, yAxisGen, lineFun;
      var d3 = $window.d3;
      var rawSvg=elem.find('svg');
      var svg = d3.select(rawSvg[0]);
      // var parseDate = d3.time.format("%Y-%m-%d").parse;
      // scope.$watchCollection(exp, function(newVal, oldVal){
      //   salesDataToPlot=newVal;
      //   redrawLineChart();
      // });
      scope.eventobj.on("watchview::orgsite::watchCollection",function(data){
        graphData.push(data);
        redrawLineChart();
      });
      function setChartParameters(){
        // console.log("[",salesDataToPlot.length,"]");
        xScale = d3.scale.linear()
        .domain(d3.extent(graphData, function(d) {
          return (new Date(d.message[xattr]));
        }))
        // .domain([1,salesDataToPlot.length])
        .range([padding + 5, rawSvg.attr("width") - padding]);
        yScale = d3.scale.linear()
        .domain([0, d3.max(graphData, function (d) {
          return d.message[yattr];
        })])
        .range([rawSvg.attr("height") - padding, 0]);
        xAxisGen = d3.svg.axis()
        .scale(xScale)
        .orient("bottom")
        .ticks(10);
        yAxisGen = d3.svg.axis()
        .scale(yScale)
        .orient("left")
        .ticks(5);
        lineFun = d3.svg.line()
        .x(function (d) {
          // console.log("date:",new Date(d.message.data.data[xattr]));
          return xScale(new Date(d.message[xattr]));
          // var hour=salesDataToPlot.length+1;
          // return hour;
        })
        .y(function (d) {
          return yScale(d.message[yattr]);
        })
        .interpolate("basis");
      }
      function drawLineChart() {
        setChartParameters();
        svg.append("svg:g")
        .attr("class", "x axis")
        .attr("transform", "translate(0,180)")
        .call(xAxisGen);
        svg.append("svg:g")
        .attr("class", "y axis")
        .attr("transform", "translate(20,0)")
        .call(yAxisGen);
        svg.append("svg:path")
        .attr({
          d: lineFun(graphData),
          "stroke": "#00BCD4",
          "stroke-width": 2,
          "fill": "none",
          "class": pathClass
        });
      }
      function redrawLineChart() {
        setChartParameters();
        svg.selectAll("g.y.axis").call(yAxisGen);
        svg.selectAll("g.x.axis").call(xAxisGen);
        svg.selectAll("."+pathClass)
        .attr({
          d: lineFun(graphData)
        });
      }
      drawLineChart();
    }
  };
});
