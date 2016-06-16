var calledfn=require('../datafnprovider.js');
var data=[11,10,21];

//divide
var clfn=new calledfn("divide");
var result=clfn.evaluate(data);
if(result.error)
{
  console.log("Invalid Inputs");
}
else{
console.log("divide---",result.output);
}

//modulo
var clfn=new calledfn("modulo");
var result=clfn.evaluate(data);
if(result.error)
{
  console.log("Invalid Inputs");
}
else{
console.log("modulo----",result.output);
}


//substract
var clfn=new calledfn("subtract");
var result=clfn.evaluate(data);
if(result.error)
{
  console.log("Invalid Inputs");
}
else{
console.log("subtract---",result.output);
}


///max
var clfn=new calledfn("max");
var result=clfn.evaluate(data);
if(result.error)
{
  console.log("Invalid Inputs");
}
else{
console.log("max----",result.output);
}


///min
var clfn=new calledfn("min");
var result=clfn.evaluate(data);
if(result.error)
{
  console.log("Invalid Inputs");
}
else{
console.log("min-----",result.output);
}

///sum
var clfn=new calledfn("sum");
var result=clfn.evaluate(data);
if(result.error)
{
  console.log("Invalid Inputs");
}
else{
console.log(result.output);
}
