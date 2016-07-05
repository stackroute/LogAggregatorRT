angular.module('tattva').directive('portfolio',function(){
  return{
    restrict:'EA',
    templateUrl:"adminDashboard/template/portfolio.html",
    scope:{
      data:"<data",
      stats:"&stats"
    },
    controller: ['$scope',function ($scope){
      $scope.selectedinstance={};
      setRootNode = function(root){
        $scope.selectedinstance = root;
      };
      setSelectDetails=function(d){
        $scope.$apply(function(){
          $scope.selectedinstance=d;
        });
      }
    }],
    link:function(scope, element, attrs){
      // console.log("inside directive link");
        scope.$watch('data', function(nv, ov) {
        scope.data = nv;
        //setting root node i.e. TATTVA node
        root = scope.data;
        if(root)
          drawMap(root);
      });
      //defining DOM Size
      var width = 300,
          height = 350,
          radius = Math.min(width, height) / 2;

      var x = d3.scale.linear()
          .range([0, 2 * Math.PI]);
      var y = d3.scale.sqrt()
          .range([0, radius]);
      var tattvaColor = "#258faf";
      var organizationColor = "#25afa2" ;
      var userColor = "#af25ab";
      var watchColor = "#ac9b98";
      var instanceColor = "#afa925";

      var svg = d3.select('#sunburstcontainer').append("svg")
          .attr("width", width)
          .attr("height", height)
        .append("g")
          .attr("transform", "translate(" + width / 2 + "," + (height / 2 + 10) + ")");

      //defining partition function
      var partition = d3.layout.partition()
          .sort(null)
          .value(function(d) { return 1; });

      //defining arc for plotting of data in chart
      var arc = d3.svg.arc()
          .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
          .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
          .innerRadius(function(d) { return Math.max(0, y(d.y)); })
          .outerRadius(function(d) { return Math.max(0, y(d.y + d.dy)); });

      var node;
      function drawMap(root) {
        // setRootNode(root);
        node = root;
        var path = svg.datum(root).selectAll("path")
            .data(partition.nodes)
          .enter().append("path")
            .attr("d", arc)
            .style("fill", function(d) {
              if(d.instanceType=="superUser"){return tattvaColor};
              if(d.instanceType=="organization"){return organizationColor};
              if(d.instanceType=="user"){return userColor};
              if(d.instanceType=="namespace"){return "grey"};
              if(d.instanceType=="Instance"){return "brown"};
              if(d.instanceType=="stream"){return "pink"}
              if(d.instanceType=="watchlist"){return "red"};
            })
            .on("click", click)
            // .on("mouseover",updateLegend)
            // .on("mouseout",removelegend)
            .each(stash);

        //on click function <--> defining behaviour of control on click of an instance
        function click(d) {
          node = d;
          path.transition()
            .duration(700)
            .attrTween("d", arcTweenZoom(d));
        }
          //defining on hover legends for sunburstchart
        // var legend = svg.append("g")
        //                 .attr("class","legend")
        //                 .style("font-size","12px")
        //                 .attr("transform", "translate(0, 20)");
        //                 // .call(d3.legend);
        // function legend_function(d)
        // {
        //   return "<h2>"+d.name+"</h2><p>"+"Instance Type: "+d.instanceType+"</p>";
        // }
        // function updateLegend(d){
        //   legend.html(legend_function(d));
        //   legend.transition().duration(200).style("opacity","1");
        // }
        // function removelegend(d){
        //   legend.transition().duration(1000).style("opacity","0");
        // }
      }
      d3.select(self.frameElement).style("height", height + "px");
      // Setup for switching data: stash the old values for transition.
      function stash(d) {
        d.x0 = d.x;
        d.dx0 = d.dx;
      }
      // When switching data: interpolate the arcs in data space.
      function arcTweenData(a, i) {
        var oi = d3.interpolate({x: a.x0, dx: a.dx0}, a);
        function tween(t) {
          var b = oi(t);
          a.x0 = b.x;
          a.dx0 = b.dx;
          return arc(b);
        }
        if (i == 0) {
         // If we are on the first arc, adjust the x domain to match the root node
         // at the current zoom level. (We only need to do this once.)
          var xd = d3.interpolate(x.domain(), [node.x, node.x + node.dx]);
          return function(t) {
            x.domain(xd(t));
            return tween(t);
          };
        } else {
          return tween;
        }
      }
      // When zooming: interpolate the scales.
      function arcTweenZoom(d) {
        // console.log("printing from dir",d);
        var obj=createobj(d);
        setSelectDetails(obj);
        // var statsObj = {
        //   name:d.name,
        //   instanceType:d.instanceType
        // };
        stats(obj);
        // change(d);
        // scope.selectedinstance=d;
        // console.log("selected instance:",scope.selectedinstance);
        var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
            yd = d3.interpolate(y.domain(), [d.y, 1]),
            yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
        return function(d, i) {
          return i
              ? function(t) { return arc(d); }
              : function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); return arc(d); };
        };
      }

      //create object for the current selection -->displayed along with the chart out of chart directive scope
      function createobj(d){
        // console.log("selection object:",d);
        var returnObject = {
          "name": d.name,
          "instanceType":d.instanceType,
          "level":d.level,
          "orgSite":d.orgSite
          };
        if(d.children.length>0){
        // returnObject[d.children[0].instanceType] = d.children.length;
          returnObject["children"]=d.children.length;
          }
        return returnObject;
        }
      }
    }
});
