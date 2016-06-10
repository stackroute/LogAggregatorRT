var highland=require('highland');
var fs=require('fs');
var wlExpression=require('../execute/dummy.json');   //watclist
var wsStream=new webSocket("ws://172.23.238.253:7070");  //record
var streamPipeline=makeStreamPipeline();
var exprPipeline=makeExprPipeline();
var publisherPipeline=makePublisherPipeline();
var webSocket=require('websocket').w3cwebsocket;
wsStream.onopen=function(){};
wsStream.onclose=function(){};
highland(wsStream).pipe(streamPipeline).pipe(exprPipeline).pipe(publisherPipeline).end();
function makeExprPipeline(){
  var processor=[];
  for(expr in wlExpression){
    console.log(expr);
    processor.push(lfield)
    processor.push(rfield)
    processor.push(outcomeForwarding)
    processor.push(labelData)
    processor.push(operator)
  }
  highland.pipeline.apply(null,processor);
};
function makeStreamPipeline(){};
function makePublisherPipeline(){};
var lfield=function(){

}

var rfield=function(){}

var outcomeForwarding=function(){}

var labelData=function(){}

var operator=function(){}
