var fs=require('fs');
var _ = require('highland');
// var bodyParser = require('body-parser');
// var parseJSON=bodyParser.json();
var output=fs.createWriteStream('../execute/output.json');
var docs=fs.createReadStream('../execute/dummy.json');
var output2=fs.createWriteStream('../execute/output2.json')


// _(docs).map(function(data)
// {
// return JSON.stringify(data.toString());
// }).pipe(process.stdout);
//
// _([{id:'1',name:'surya',op:'+',num1:'2',num2:'3'},{id:'1',name:'surya',op:'-',num1:'2',num2:'3'}]).map(function(data){
// return ""+data.op+"";
// }).map(function(data){
// if(data=='+')
// {
// return ""+5+"";
// }
// else{
// return ""+8+"";
// }
// }).pipe(process.stdout);
//
// var watchpipeline=_.pipeline(
// _.map(function(data){
// var names=JSON.stringify;
// return data;
// }),
// _.map(function(data){
// return data;
// })
// );
// _(docs).pipe(watchpipeline).pipe(process.stdout);


// var fiterpipelineExample=_.pipe()





// var through = _.pipeline(
//     _.map(parseJSON),
//     _.reduce(collectCategories)
// );
// function collectCategories(data){
// console.log("hi")
// }
//     // _.filter(isBlogpost),
//     // _.through(output)
// docs.pipe(output);

// var doubled = _([1, 2, 3, 4]).map(function (x) {
//   return (""+x+"");
// }).pipe(process.stdout);
//
// for( i in doubled)
// {
// console.log(doubled[i]);
// }


// console.log(doubled);
//
// var through2 = _.pipeline(function (s) {
//     return s.map(parseJSON).filter(isBlogpost); // etc.
// });
//


//success async nfcall([]).parellel
// _([
// function a(){
// console.log("hi");
// },  function b(){
// console.log("hello");
//   }
// ]).nfcall([]).parallel(2).toArray(function (xs) {
//   console.log(xs.length);
// })

//success  pipes to a output stream
// docs.pipe(output);

//try one success fibonacci take give no of o/p value,push pushes next to run for next time

// var fibGenerator = function() {
//     var a = 0, b = 1;
//     return function(push, next) {
//         push(null, b);
//         b = b+a; a = b-a;
//         next();
//     };
// }();
// _(fibGenerator).take(20).each(console.log.bind(console));


//failure
// var through=_.pipeline(_.filter(isBlogpost));

// var isBlogpost=function()
// {
// console.log("hi");
// }
