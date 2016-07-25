var request = require("request");

function processCordinator() {
  var noOfProcessors=3;
  var processorUrl = [];

  this.assignWorkersToProcesor=function(workerTopology, callback) {
    workerMap = {};
    workerTopology.forEach(function(worker){
      processorObj = getNextAvailableProcessor();

      if(workerMap[processorObj.url] === undefined) {
        workerMap[processorObj.url] = [];
      }
      workerMap[processorObj.url].push(worker);
      console.log("workerMap:",workerMap);
      // processorObj.updateNewWorkerAdd(worker);
    })
    return workerTopology;
  }
  getNextAvailableProcessor = function() {
    // minProcessor = Math.min.apply(Math,function(processorUrl) { return processorUrl.workers.length; });
    var task=[];
    for(var i=0;i<processorUrl.length;i++)
    {
      task.push(processorUrl[i].workers.length);
    }

    var minProcessor=Math.min.apply(Math,task);
    var index=task.indexOf(minProcessor);
    return processorUrl[index];
  }


  this.initializeProcessors=function(){
    for(var i=0;i<noOfProcessors;i++){
      processorUrl.push({
        url: ("Processor::" + (processorUrl.length + 1)),
        ipaddr: "",
        port: "",
        upTime: "",
        workers: []
      });
    }
    return processorUrl;
  };

  // this.allocateProcessors=function(workers){
  //   var task=[];
  //   for(var i=0;i<processorArray.length;i++)
  //   {
  //     task.push(processorArray[i].tasks.length);
  //   }
  //   for(var i=0;i<workers.length;i++){
  //     var minValue=Math.min.apply(Math,task);
  //     var index=task.indexOf(minValue);
  //
  //     // var status=performRequest(workers[i]);
  //     // if(status){
  //       processorArray[index].tasks.push(JSON.stringify(workers[i]));
  //         // savein db;
  //     // }
  //     // performRequest(workers[i]).then(function(response){
  //     //   console.log(response.data);
  //       // processorArray[index].tasks.push(JSON.stringify(workers[i]));
  //     //   // savein db;
  //     // },function(response){
  //     //   console.log("Error:",response.data.error);
  //     // });
  //   }
  //   return processorArray;
  // };
  //
  // var performRequest = function(workerTask) {
  //
  //   var options = { method: 'POST',
  //   url: 'http://127.0.0.1:8082/watchtaskprocessor/watchtask',
  //   qs: workerTask};
  //
  //   return request(options, function (error, response, body) {
  //     if (error) throw new Error(error);
  //     // console.log(body);
  //     return true;
  //   });
  //
  //   // return request('/watchtaskprocessor/watchtask','POST',workerTask, function(error, response, body) {
  //   //   console.log(body);
  //   // });
  // };
}
var processCordinator = module.exports = exports = new processCordinator;
