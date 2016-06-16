angular.module('tattva')
.directive('donutchart', function(){
  function link(scope, el, attr){
    var color = d3.scale.category10();
    var data = scope.myresult.value;
    var width = 230;
    var height =230;
    var min = Math.min(width, height);
    var svg = d3.select(el[0]).append('svg');
    var pie = d3.layout.pie().sort(null);
    var arc = d3.svg.arc()
    .outerRadius(min / 2 * 0.9)
    .innerRadius(min / 2 * 0.5);
    svg.attr({width: width, height: height});
    var g = svg.append('g')
    // center the donut chart
    .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
    // add the <path>s for each arc slice
    g.selectAll('path').data(pie(data))
    .enter().append('path')
    .style('stroke', 'white')
    .attr('d', arc)
    .attr('fill', function(d, i){ return color(i) });
  }
  return {
    link: link,
    restrict: 'E'
  };
});
