console.log("MultiLineChart");
var graphData1 = [];
var graphData2 = [];
var xattr='commitDateTime';
var yattrDel='deletion';
var yattrIns='insertion';
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
  data: [
    {
      type: "line",
      color: "#F08080",
      dataPoints : graphData1
    },
    {
      type:"line",
      color: "#20B2AA",
      dataPoints:graphData2
    }]

  });
  //chart.render();

  var updateChart = function () {
    chart.render();
  };


  var socket = io();
  socket.on('connect', function () {
    console.log("Connected to socket server...!");
    //  ["CapitalOneDBNew.gitLogs",1466777632.196,{"commitDateTime":"2009-01-22T22:38:16Z","commitDate":"January  5 2009","commitDay":"Friday","commitMonth":"January","commitYear":"2009","noOfFiles":1,"insertion":22,"deletion":0,"repo":"mongo-python-driver","gitUserName":"mongodb","reviewers":[],"committer":{"name":"Mike Dirolf","email":"mike@10gen.com","gitUserId":"NA"},"author":{"name":"Mike Dirolf","email":"mike@10gen.com","gitUserId":"NA"},"commitId":"601b1618ad2be0887b45d97bb1e3726e049dc267"}]
    var eventName = "watchlist::onResult::Wipro::Git Analysis";
    socket.on(eventName,function(data){
      var date = new Date(data.logdata[xattr]);
      parsedDate = new Date(date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds());
      graphData1.push({x:parsedDate,y:data.logdata[yattrIns]});
      graphData2.push({x:parsedDate,y:data.logdata[yattrDel]});

      updateChart();
    });

  });
