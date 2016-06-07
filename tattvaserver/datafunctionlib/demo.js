var calledfn=require('./functionexecutor.js');

var clfn=new calledfn();
var arr=[11,10,12];
console.log( clfn.evaluate("sum",arr) );
 console.log( clfn.evaluate("max",arr) );
  console.log( clfn.evaluate("min",arr) );
  console.log(   clfn.evaluate("modulo",arr) );
    console.log(   clfn.evaluate("substraction",arr));
      console.log(   clfn.evaluate("divide",arr) );
