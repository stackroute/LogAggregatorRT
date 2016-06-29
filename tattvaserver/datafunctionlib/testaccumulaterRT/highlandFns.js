var highland = require('highland');
var websocket = require('websocket-stream');
var fs=require("fs");

var dataSource = {
  ipaddr: '172.23.238.253',
  port: '7070'
};

var wsstream = websocket('ws://' + dataSource.ipaddr + ':' + dataSource.port);

// var wt = fs.createWriteStream('wl.txt');

var calledfn=require('./functionexecutor.js');
var clfn=new calledfn("time");
clfn.accumulatetill(1000);

highland(wsstream)
.map(function(data) {
  data = JSON.parse(data);
  var data={'data':data[2]};
  return data;
})
.map(function(data){
  console.log("inside map function");
  data['path']={};
  data['path']['insertions']='';
  // if(data.data.deletion > 0) {
  // data['path']['ratio'] = (data.data.insertion/data.data.deletion);
  // }
  data['path']['insertions']=clfn.accumulatefullcheck(data.data.insertion);
  return data;
})
.each(function(data) {
  console.log(data);
  // process.stdout.write(data);
})
// .pipe(process.stdout)
// console.log("File created");
