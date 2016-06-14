var calledfn=require('../aggrprovider.js');
var data=[11,10,21,10,32,12,23,43];


//sum aggregator
var clfn=new calledfn("sum");
var result=clfn.evaluate(data);
console.log("sum aggregator------",result);

//min aggregator
var clfn=new calledfn("min");
var result=clfn.evaluate(data);
console.log("min aggregator------",result);

//sum aggregator
var clfn=new calledfn("max");
var result=clfn.evaluate(data);
console.log("max aggregator------",result);

//sum aggregator
var clfn=new calledfn("count");
var result=clfn.evaluate(data);
console.log("count aggregator------",result);

//sum aggregator
var clfn=new calledfn("average");
var result=clfn.evaluate(data);
console.log("average aggregator------",result);
