var calledfn=require('./functionexecutor.js');

var clfn=new calledfn();
var arr=[11,10,12];
 clfn.evaluate("sum",arr);
 clfn.evaluate("max",arr);
