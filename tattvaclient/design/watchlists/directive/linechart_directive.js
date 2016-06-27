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
      var xattr=scope.configobj.xaxis;
      var yattr=scope.configobj.yaxis;
      var padding = 20;
      var pathClass="path";
      var xScale, yScale, xAxisGen, yAxisGen, lineFun;
      var d3 = $window.d3;
      var rawSvg=elem.find('svg');
      var svg = d3.select(rawSvg[0]);
      var parsedDate=null;

      scope.eventobj.on("watchlist::graphdata",function(data){
        if(graphData.length >= 100) graphData = [];
        graphData.push(data);
        redrawLineChart();
      });
      function setChartParameters(){
         xScale = d3.time.scale.utc()
        .domain(d3.extent(graphData, function(d) {
           return (parsedDate);
          // return d.message[xattr];
        }))
        // .domain([1,graphData.length])
        .range([padding +5, rawSvg.attr("width") - padding]);
        //  .rangeRoundBands([20, rawSvg.attr("width")]);
        yScale = d3.scale.linear()
        .domain([0, d3.max(graphData, function (d) {
          return d.message[yattr];
        })])
        .range([rawSvg.attr("height") - padding, 0]);
        xAxisGen = d3.svg.axis()
        .scale(xScale)
        .orient("bottom")
        .ticks(10)
        .tickFormat(d3.time.format.utc('%D %Hh %Mm %Ss'));
        yAxisGen = d3.svg.axis()
        .scale(yScale)
        .orient("left")
        .ticks(5);
        lineFun = d3.svg.line()
        .x(function (d) {
          // console.log("X axis date now as : ", d.message[xattr]);
          // return xScale(d.message[xattr]);
          var date = new Date(d.message[xattr]);
          // d.message[xattr] = date.toUTCString();
          // date = new Date(d.message[xattr]);
          parsedDate = new Date(date.getUTCFullYear(),
          date.getUTCMonth(),
          date.getUTCDate(),
          date.getUTCHours(),
          date.getUTCMinutes(),
          date.getUTCSeconds());
          return xScale(parsedDate);
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
        svg.selectAll("g.x.axis").call(xAxisGen);
        svg.selectAll("g.y.axis").call(yAxisGen);
        svg.selectAll("."+pathClass)
        .attr({
          d: lineFun(graphData)
        });
      }
      drawLineChart();
    }
  };
});
