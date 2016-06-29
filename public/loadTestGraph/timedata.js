console.log("LineChart");
var graphData = [];
var xattr='commitDateTime';
var yattr='deletion';
var parsedDate=null;

var chart = new CanvasJS.Chart('container',{
  title :{
    text: "Live Data"
  },
  axisX: {
    title: "Axis X Title"
  },
  axisY: {
    title: "Units"
  },
  data: [{
    type: "line",
    dataPoints : graphData
  }]
});
chart.render();

var updateChart = function () {
  chart.render();
};


var socket = io();
socket.on('connect', function () {
  var roomName="tattva::Git anomaly analysis for commits";
  console.log("joined the room");
  socket.emit('join:room', {
    'room':roomName
  });

  //  ["CapitalOneDBNew.gitLogs",1466777632.196,{"commitDateTime":"2009-01-22T22:38:16Z","commitDate":"January  5 2009","commitDay":"Friday","commitMonth":"January","commitYear":"2009","noOfFiles":1,"insertion":22,"deletion":0,"repo":"mongo-python-driver","gitUserName":"mongodb","reviewers":[],"committer":{"name":"Mike Dirolf","email":"mike@10gen.com","gitUserId":"NA"},"author":{"name":"Mike Dirolf","email":"mike@10gen.com","gitUserId":"NA"},"commitId":"601b1618ad2be0887b45d97bb1e3726e049dc267"}]

  socket.on("watchlist::graphdata",function(data){
    var date = new Date(data.message[xattr]);
    parsedDate = new Date(date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds());
    graphData.push({x:parsedDate,y:data.message[yattr]});
    updateChart();
  });

});
