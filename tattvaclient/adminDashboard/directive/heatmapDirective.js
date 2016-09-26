angular.module('tattva').directive('heatmap',function(){
  return{
    restrict:'EA',
    templateUrl:"adminDashboard/template/processorGraph.html",
    scope : {
      processorObj:"<data",
      filter:"<filter",
      processorName:"<processorName"
    },
    /*controller: ['$scope',function ($scope){
      saveprocessorName = function(name){
        // $scope.processorName = name;
      };
    }],*/
    link:function(scope, element, attrs){
      //console.log("processorObj is ", scope.processorObj, " for processor ", scope.processorName);
      var data = [];
      var nop = scope.processorObj.tasks.length;
      var ncols = 5;
      var nrows = Math.floor(nop/ncols);
      if(nop%ncols){
        nrows++;
      }

      var index = 0;
      for(var row=0;row<nrows;row++){
        for(var col=0;col<ncols;col++){
          if(scope.processorObj.tasks[index]){
            data.push(
              {
                "row" : row,
                "column" : col,
                "watchName" : scope.processorObj.tasks[index].watchName,
                "value" : 1,
                "watchTask" : scope.processorObj.tasks[index].type,
                "processorName": "processor1"
              });
              index++;
            }
          }
        }
      // console.log("data",data);

      // console.log("element[0].clientWidth:",attrs);
      // console.log(element[0].clientWidth);
      var margin = { top: 50, right: 0, bottom: 100, left: 30 },
      width = 150 - margin.left - margin.right,
      height = 150 - margin.top - margin.bottom,
      gridSize = Math.floor(30),
      // legendElementWidth = gridSize*2,
      buckets = 9;

      // var svg = d3.select(divId).append("svg")
      var rawSvg=element.find('svg');
      var svg = d3.select(rawSvg[0])
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      heatmapChart(data);

      function heatmapChart(data) {
        colors = ["#ffffd9","#e5ffe5","#b2ffb2","#7fff7f","#4cff4c","#00e500","#00b200","#007f00","#003300"];
        //console.log("data to heatmapChart:",data);
        var colorScale = d3.scale.quantile()
        .domain([0, buckets - 1, d3.max(data, function (d) { return d.value; })])
        .range(colors);

        var cards = svg.selectAll(".column")
        .data(data, function(d) {return d.row+':'+d.column;});

        cards.append("title");

        cards.enter().append("rect")
        .attr("x", function(d) { return (d.column - 1) * gridSize; })
        .attr("y", function(d) { return (d.row - 1) * gridSize; })
        .attr("rx", 6)
        .attr("ry", 6)
        .attr("class", "column bordered")
        .attr("width", gridSize)
        .attr("height", gridSize)
        // .on("mouseout", deleteLegend(d))
        .style("fill", colors[0])
        .on("mouseover", function(d){
          d3.select(this).classed("cell-hover",true);
          d3.select("#tooltip")
          .style("left", (d3.event.pageX+10) + "px")
          .style("top", (d3.event.pageY-10) + "px")
          .select("#value")
          .text("Watch : " + d.watchName + "  Task" + ":" + d.watchTask);
          d3.select("#tooltip").classed("hidden", false);
        })
        .on("mouseout", function(){
          d3.select(this).classed("cell-hover",false);
          d3.select("#tooltip").classed("hidden", true);
        });

        cards.transition().duration(1000)
        .style("fill", function(d) { return colorScale(d.value); });

        cards.select("title").text(function(d) { return d.value; });

        cards.exit().remove();

      }
    }
  };
});
