var highland = require('highland');
var websocket = require('websocket-stream');
var fs=require("fs");

var dataSource = {
  ipaddr: '172.23.238.251',
  port: '7070'
};

var wsstream = websocket('ws://' + dataSource.ipaddr + ':' + dataSource.port);

// var wt = fs.createWriteStream('wl.txt');

var calledfn=require('./functionexecutorac.js');
var clfn=new calledfn("Record");
clfn.accumulateTill(10);

var mybucket = [];

highland(wsstream)
.map(function(data) {
  data = JSON.parse(data);
  var data={'data':data[2]};
  return data;
})
.map(function(data){
  mybucket.push(data.data.insertion);
  var accumulatedData = clfn.collectData(data.data.insertion);
  if(accumulatedData) {
    //console.log("Accumulated data for ", duration, " ", unit, " : ", moment().format("YYYY-MM-DD HH:mm:ss"), " : ", accumulatedData);
    console.log("Accumulated data for record count ", accumulatedData.length, " data ", accumulatedData);
    console.log("My bucket: ", mybucket);
    mybucket.shift();
  }

  return data;
}).each(function(data) {
    // console.log( "data",data);
  // process.stdout.write(data);
});
// .pipe(process.stdout)
// console.log("File created");
