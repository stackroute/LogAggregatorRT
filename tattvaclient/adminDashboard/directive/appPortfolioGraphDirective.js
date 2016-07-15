angular.module('tattva').directive('portfolio',function(){
  return{
    restrict:'EA',
    templateUrl:"adminDashboard/template/portfolio.html",
    scope:{
      data:"<data",
      stats:"&stats",
      // hover:"&hover"
    },
    controller: ['$scope',function ($scope){
      //default selection
      $scope.selectedinstance={};
      $scope.hoverStats = {};
      setRootNode = function(root){
        $scope.selectedinstance = root;
      };
      setSelectDetails=function(d){
        $scope.$apply(function(){
          $scope.selectedinstance=d;
        });
      }
      setHoverDetails=function(d){
        $scope.$apply(function(){
          // console.log("d.name",d.name);
          $scope.hoveredinstance=d.name;
          console.log(d);
          if(d.streamname){
            console.log("d.streamname",d.streamname);
            $scope.hoveredinstance = d.streamname;
          }
        })
      }
      hover = function(d){
        $scope.$apply(function(){
          if(d.instanceType == "super User"){
            $scope.hoverStats["collection"] = "organisations";
            $scope.hoverStats["count"] = d.children.length;
            $scope.hoverStats["orgSite"] ="";
          }
          else{
            $scope.hoverStats["collection"] = "watchlists for ";
            $scope.hoverStats["orgSite"] = d.orgSite;
            if(d.orgsite){
              $scope.hoverStats["orgSite"] = d.orgsite;
            }
            $scope.hoverStats["count"] = d.orgwatchcount;
          }
        })
      }

    }],
    link:function(scope, element, attrs){
      // console.log("inside directive link");
        scope.$watch('data', function(nv, ov) {
        scope.data = nv;
        //setting root node i.e. TATTVA node
        root = scope.data;
        if(root)
        {
          var obj=createobj(root);
          setRootNode(obj);
          drawMap(root);
        }
      });
      //defining DOM Size
      var width = 400,
          height = 400,
          radius = Math.min(width, height) / 2;

      var x = d3.scale.linear()
          .range([0, 2 * Math.PI]);
      var y = d3.scale.sqrt()
          .range([0, radius]);
      var tattvaColor = "#F7F7F7";
      var organizationColor = d3.scale.category20();
      // var namespaceColor = d3.scale.category20c();
      var namespaceColor = d3.scale.ordinal()
                              .range(["#5687d1","#7b615c","#de783b","#6ab975","#a173d1","#bbbbbb"]);
      // var datasourceColor = d3.scale.category20();
      var datasourceColor = d3.scale.ordinal()
                                .range(["#396AB1","#DA7C30","#3E9651","#CC2529","#535154","#6B4C9A","#922428","#948B3D"]);
      // var streamColor = d3.scale.category20();
      var datasourceColor = d3.scale.ordinal()
                              .range(["#5687d1","#7b615c","#de783b","#6ab975","#a173d1","#bbbbbb"]);

      // var watchColor = d3.scale.category20();
      var watchColor = d3.scale.ordinal()
                                .range(["#396AB1","#DA7C30","#3E9651","#CC2529","#535154","#6B4C9A","#922428","#948B3D"]);

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

          (function() {
            d3.legend = function(g) {
              g.each(function() {
            var g= d3.select(this),
            items = {},
            svg = d3.select(g.property("nearestViewportElement")),
            legendPadding = g.attr("data-style-padding") || 5,
            lb = g.selectAll(".legend-box").data([true]),
            li = g.selectAll(".legend-items").data([true])

        lb.enter().append("rect").classed("legend-box",true)
        li.enter().append("g").classed("legend-items",true)

        svg.selectAll("[data-legend]").each(function() {
            var self = d3.select(this)
            items[self.attr("data-legend")] = {
              pos : self.attr("data-legend-pos") || this.getBBox().y,
              color : self.attr("data-legend-color") != undefined ? self.attr("data-legend-color") : self.style("fill") != 'none' ? self.style("fill") : self.style("stroke")
            }
          })

        items = d3.entries(items).sort(function(a,b) { return a.value.pos-b.value.pos})

        li.selectAll("text")
            .data(items,function(d) { return d.key})
            .call(function(d) { d.enter().append("text")})
            .call(function(d) { d.exit().remove()})
            .attr("y",function(d,i) { return i+"em"})
            .attr("x","1em")
            .text(function(d) { return d.key;});

        li.selectAll("circle")
            .data(items,function(d) { return d.key})
            .call(function(d) { d.enter().append("circle")})
            .call(function(d) { d.exit().remove()})
            .attr("cy",function(d,i) { return i-0.25+"em"})
            .attr("cx",0)
            .attr("r","0.4em")
            .style("fill",function(d) { return black;});
            // .style("fill",function(d) { console.log(d.value.color);return d.value.color})

        // Reposition and resize the box
        var lbbox = li[0][0].getBBox()
        lb.attr("x",(lbbox.x-legendPadding))
            .attr("y",(lbbox.y-legendPadding))
            .attr("height",(lbbox.height+2*legendPadding))
            .attr("width",(lbbox.width+2*legendPadding))
      })
      return g
    }
    })()

          // defining on hover legends for sunburstchart
          var legend = svg.append("g")
          .attr("class","legend")
          .attr("width","18px")
          .attr("height","18px")
          .style("font-size","12px")
          .attr("transform", "translate(0, 20)")
          .call(d3.legend);

      var node;
      function drawMap(root) {
        // setRootNode(root);
        node = root;
        var path = svg.datum(root).selectAll("path")
            .data(partition.nodes)
          .enter().append("path")
            .attr("d", arc)
            .style("fill", function(d) {
              if(d.instanceType=="super User"){return tattvaColor;}
              if(d.instanceType=="organization"){return namespaceColor(d.name)};
              if(d.instanceType=="namespace"){return namespaceColor(d.name)};
              if(d.instanceType=="datasource"){return datasourceColor(d.name)};
              if(d.instanceType=="stream"){return namespaceColor(d.name)}
              if(d.instanceType=="watchlist"){return datasourceColor(d.name)};
              // else{
              //   return RandomColor();
              // }
            })
            .on("click", click)
            .on("mouseover",updateLegend)
            .on("mouseout",removelegend)
            .each(stash);

        //on click function <--> defining behaviour of control on click of an instance
        function click(d) {
          node = d;
          path.transition()
            .duration(700)
            .attrTween("d", arcTweenZoom(d));
        }

        function legend_function(d)
        {
          // console.log(d);
          // return "<h2>"+d.name+"</h2><p>"+"Instance Type: "+d.instanceType+"</p>";

          return "<div><h2>d.name</h2></div>"
        }
        function updateLegend(d){
          var obj=createobj(d);
          // if(d.instanceType == "super User"){
          // obj["count"] = d.children.length;
          // }
          hover(d);
          setHoverDetails(obj);

          d3.select("#explanation")
            .style("visibility", "");
          // legend.html(legend_function(d));
          // legend.transition().duration(100).style("opacity","1");
        }
        function removelegend(d){
          legend.transition().duration(1000).style("opacity","1");
        }
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
        var obj=createobj(d);
        setSelectDetails(d);
        stats(d);
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
          if(d.streamname){
            returnObject.name = d.streamname;
          }
        return returnObject;
        }
      }
    }
});
