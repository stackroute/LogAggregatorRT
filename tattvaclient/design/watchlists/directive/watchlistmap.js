angular.module('tattva').directive('watchlistmap', function() {
  return {
    scope: {
      watchdata: "<watch"
    },
    link: function(scope, element, attrs) {

      var watchdata = null;

      //watch for data updation from form on DOM

      // scope.$watch('watchdata', function(nv, ov) {
      //     watchdata = scope.watchdata;
      //     drawmap();
      // }, true);
      scope.$watch('watchdata.namespace', function(nv, ov) {
        watchdata = scope.watchdata;
        drawmap();
      }, true);
      scope.$watch('watchdata.stream', function(nv, ov) {
        watchdata = scope.watchdata;
        drawmap();
      }, true);
      scope.$watch('watchdata.expressions.length', function(nv, ov) {
        watchdata = scope.watchdata;
        drawmap();
      }, true);
      scope.$watch('watchdata.publishers', function(nv, ov) {
        watchdata = scope.watchdata;
        drawmap();
      }, true);

      //get the width and height of screen
      var screenwidth = element[0].clientWidth;
      var screenheight = element[0].clientHeight;


      //set the width,height and margins for d3 layout
      var margin = [20, 40, 20, 80],
      width = screenwidth - margin[1] - margin[3],
      height = screenheight - margin[0] - margin[2],
      i = 0,
      root;
      width = 700;
      height = 80;

      //specify type of d3
      var tree = d3.layout.tree().size([height, width]);
      var diagonal = d3.svg.diagonal().projection(function(d) {
        return [d.y, d.x];
      });

      //append svg to tree layout
      var vis = d3.select(element[0]).append("svg:svg")
      .attr("class", "svgsize")
      .attr("width", width + margin[1] + margin[3])
      .attr("height", height + margin[0] + margin[2])
      .append("svg:g")

      .attr("transform", "translate(" +  margin[3] + "," + margin[0] + ")");



      // Toggle children.
      function toggle(d) {
        if (d.children) {
          d._children = d.children;
          d.children = null;
        } else {
          d.children = d._children;
          d._children = null;
        }
      }

      function toggleAll(d) {
        if (d.children) {
          d.children.forEach(toggleAll);
          toggle(d);
        }
      }


      //function which is called when watch data is updated.
      //It updates the graph, as the watclist data object is updated.
      function drawmap() {

        var mainroot = {};
        //color code array for namespace,streams and expressions
        var colorcode = [{
          name: "namespace",
          color: "#009999"
        }, {
          name: "datasources",
          color: "#0000b3"
        }, {
          name: "expressions",
          color: "#871287"
        }, {
          name: "output",
          color: "#00cc00"
        }];

        if (watchdata.namespace !== "") {
          mainroot = {
            "name": "",
            "color": colorcode[0].color,
            "children": []
          };
          mainroot.name = watchdata.namespace;
          //streams node
          if (watchdata.stream !== "") {
            (mainroot.children).push({
              "name": watchdata.stream,
              "color": colorcode[1].color,
              "children": []
            });
          }
          var expressions = watchdata.expressions;
          var parent;
          parent = mainroot.children[0];
          //expressions node
          for (var i = 0; i < expressions.length; i++) {
             (parent.children).push({
              "name": expressions[i].tag,
              "color": colorcode[2].color,
              "children": []
            });
            parent = parent.children[0];

          }
          //publishers node
        //   if ( watchdata.expressions.length !=0) {
        //     var arr=['dashboard','outstream','database'];
        //     console.log((watchdata.publishers).dashboard.tabs.length!=0);
        //     console.log(Object.keys(watchdata.publishers.database).length!=0);
        //     console.log(Object.keys(watchdata.publishers.outstream).length!=0);
        //     if((watchdata.publishers).dashboard.tabs.length!=0 && Object.keys(watchdata.publishers.database).length!=0 && Object.keys(watchdata.publishers.outstream).length!=0)
        //     {
        //       for(var i=0;i<arr.length;i++)
        //       {
        //     parent.children[i] = {
        //       "name": arr[i],
        //       "color": colorcode[3].color,
        //       "children": []
        //     }
        //   }
        //   }
        //     if((watchdata.publishers).dashboard.tabs.length!=0  &&  Object.keys(watchdata.publishers.database).length!=0)
        //     {
        //       parent.children[0] = {
        //         "name": "dashboard",
        //         "color": colorcode[3].color,
        //         "children": []
        //       },
        //       parent.children[1] = {
        //         "name": "database",
        //         "color": colorcode[3].color,
        //         "children": []
        //       }
        //
        //     }
        //     if((watchdata.publishers).dashboard.tabs.length!=0  && Object.keys(watchdata.publishers.outstream).length!=0)
        //     {
        //       parent.children[0] = {
        //         "name": "dashboard",
        //         "color": colorcode[3].color,
        //         "children": []
        //       },
        //       parent.children[1] = {
        //         "name": "outstream",
        //         "color": colorcode[3].color,
        //         "children": []
        //       }
        //     }
        //     if( Object.keys(watchdata.publishers.database).length!=0 && Object.keys(watchdata.publishers.outstream).length!=0)
        //     {
        //       console.log("outstream1");
        //       parent.children[0] = {
        //         "name": "database",
        //         "color": colorcode[3].color,
        //         "children": []
        //       },
        //       parent.children[1] = {
        //         "name": "outstream",
        //         "color": colorcode[3].color,
        //         "children": []
        //       }
        //     }
        //     if( Object.keys(watchdata.publishers.database).length!=0)
        //     {
        //       parent.children[0] = {
        //         "name": "database",
        //         "color": colorcode[3].color,
        //         "children": []
        //       }
        //     }
        //     if(Object.keys(watchdata.publishers.outstream).length!=0)
        //     {
        //       parent.children[0] = {
        //         "name": "outstream",
        //         "color": colorcode[3].color,
        //         "children": []
        //       }
        //
        //     }
        //     if(watchdata.publishers.dashboard.tabs.length!=0 )
        //     {
        //       parent.children[0] = {
        //         "name": "dashboard",
        //         "color": colorcode[3].color,
        //         "children": []
        //       }
        //     }
        //
        // }
        //

          root = mainroot;
          root.x0 = height / 2;
          root.y0 = 0;
          update(root);
          scope.root = root;

        }

      }


      // animation for each node as it updates
      function update(source) {
        var duration = 500;
        if (!(source != null)) {
          return;
        }


        // Compute the new tree layout.

        var nodes = tree.nodes(root).reverse();


        // Normalize for fixed-depth.
        var deepest = 0,
        generationGutter = width;
        nodes.forEach(function(d) {
          if (deepest < d.depth) {
            deepest = d.depth;
          }
        });
        generationGutter = Math.floor(width / (deepest + 1));
        nodes.forEach(function(d) {
          d.y = d.depth * generationGutter;

        });

        // Update the nodes…
        var node = vis.selectAll("g.node")
        .data(nodes, function(d) {
          return d.id || (d.id  = ++i);

        });

        // Enter any new nodes at the parent's previous position.
        var nodeEnter = node.enter().append("svg:g")
        .attr("class", "node")
        .attr("transform", function(d) {
          return "translate(" + source.y0 + "," + source.x0 + ")";
        });

        //inject content to node
        InjectNodeContent(nodeEnter);

        // Transition nodes to their new position.
        var nodeUpdate = node.transition()
        .duration(duration)
        .attr("transform", function(d) {
          return "translate(" + d.y + "," + d.x + ")";
        });

        nodeUpdate.select("circle")
        .attr("r", 4.5)
        .style("fill", function(d) {
          return d._children ? "lightsteelblue" : "#fff";
        });


        function wrap(text,width) {
          text.each(function() {
            //console.log(this);
            var text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 0.4, // ems
            y = text.attr("y"),
            dy = parseFloat(text.attr("dy")),
            tspan = text.text(null).append("tspan").attr("x", 10).attr("y", y).attr("dy", lineHeight + "em");
            while (word = words.pop()) {
              line.push(word);
              tspan.text(line.join(" "));
              if (tspan.node().getComputedTextLength() > width) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = text.append("tspan").attr("x", 10).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
              }
            }
          });
        }



        nodeUpdate.selectAll("text.name")
        // .text(function(d) {
        //     return d.name;
        // })
        .call(wrap,80)
        .style("fill-opacity", 1);

        nodeUpdate.selectAll("text.sf")
        .text(function(d) {
          var name=(d.name).trim();
          var arr=name.split(' ');

          var sform="";
          for(var i=0;i<arr.length;i++)
          {
            sform+=(arr[i].charAt(0)).toUpperCase();


          }
          return sform;
        })
        .style("fill-opacity", 1);

        // Transition exiting nodes to the parent's new position.
        var nodeExit = node.exit().transition()
        .duration(duration)
        .attr("transform", function(d) {
          return "translate(" + source.y + "," + source.x + ")";
        })
        .remove();

        nodeExit.select("circle")
        .attr("r", 1e-6);

        nodeExit.select("text")
        .style("fill-opacity", 1e-6);

        // Update the links…
        var link = vis.selectAll("path.link")
        .data(tree.links(nodes), function(d) {
          return d.target.id;
        });

        // Enter any new links at the parent's previous position.
        link.enter().insert("svg:path", "g")
        .attr("class", "link")
        .attr("d", function(d) {
          var o = {
            x: source.x0,
            y: source.y0
          };
          return diagonal({
            source: o,
            target: o
          });
        })
        .transition()
        .duration(duration)
        .attr("d", diagonal);

        // Transition links to their new position.
        link.transition()
        .duration(duration)
        .attr("d", diagonal);

        // Transition exiting nodes to the parent's new position.
        link.exit().transition()
        .duration(duration)
        .attr("d", function(d) {
          var o = {
            x: source.x,
            y: source.y
          };
          return diagonal({
            source: o,
            target: o
          });
        })
        .remove();

        // Stash the old positions for transition.
        nodes.forEach(function(d) {
          d.x0 = d.x;
          d.y0 = d.y;
        });
      }


      function InjectNodeContent(nodeEnter) {


        //append rectangle svg for each node
        nodeEnter.append("rect")
        .attr("x", -8)
        .attr("y", -8)
        .attr("width", width / 7)
        .attr("height", 30)
        .attr("rx", 4)
        .attr("ry", 4)
        .style("fill", function(d) {
          return d._children ? "lightsteelblue" : "#fff";
        })
        .style("stroke", function(d) {
          return d._children ? "#9999ff" : "#808080";
        })
        .classed("toggleCircle", true)
        .on("click", function(d) {
          toggle(d);
          update(d);

        });

        //method to fill each node with left rounded reactangle
        function leftRoundedRect(x, y, width, height, radius) {
          return "M" + x + "," + y +
          "h" + (width - 2 * radius) +
          "h" + radius + "v" + radius + "v" + (height - 2 * radius) +
          "v" + radius + "h" + -radius + "h" + (2 * radius - width) +
          "a" + radius + "," + radius + " 0 0 1 " + -radius + "," + -radius +
          "v" + (2 * radius - height) +
          "a" + radius + "," + radius + " 0 0 1 " + radius + "," + -radius +
          "z";
        }

        //to fill each node with specified color
        nodeEnter.append("path")
        .attr("d", leftRoundedRect(-4, -8, 12, 30, 4))
        .style("fill", function(d) {
          return d._children ? "lightsteelblue" : d.color;
        })
        .classed("toggleCircle", true)
        .on("click", function(d) {
          toggle(d);
          update(d);
        });
        //function to make short form of each name
        function shortform(name)
        {
          var name=name.trim();
          var arr=name.split(' ');

          var sform="";
          for(var i=0;i<arr.length;i++)
          {
            sform+=(arr[i].charAt(0)).toUpperCase();


          }
          return sform;
        }
        //append svg for short form on each node
        nodeEnter.append("svg:text")
        .attr("class", "name")
        .attr("x", 20)
        .attr("dy", "0.50em")
        .attr("text-anchor", "start")
        .text(function(d) {
          return d.name;

        })
        .style("fill-opacity", 1e-6)
        .style("font-size","12")

        //text for each associated node
        // nodeEnter.append("svg:text")
        // .attr("class", "name")
        //     .attr("x", 15)
        //     .attr("y", "3.5em")
        //     .attr("text-anchor", "start")
        //     .text(function(d) {
        //       return d.name;
        //
        //     })
        //     .style("fill-opacity", 1e-6);










        //append Buttons under each node on hover when edit Mode is true ****pending tasks

      }
    } //end of link function
  }

});
