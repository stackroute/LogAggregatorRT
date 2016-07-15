function processCordinator() {
  var noOfProcessors=3;
  var processorArray = [];

  this.getProcessors=function(){
    for(var i=0;i<noOfProcessors;i++){
      processorArray.push({
        pid:("Processor::" + (processorArray.length + 1)),
        tasks:[],
        ipaddr:"",
        port:"",
        upTime:""
      });
    }
    return processorArray;
  };

  this.allocateProcessors=function(workers){
    var task=[];
    for(var i=0;i<processorArray.length;i++)
    {
      task.push(processorArray[i].tasks.length);
    }
    for(var i=0;i<workers.length;i++){
      var minValue=Math.min.apply(Math,task);
      var index=task.indexOf(minValue);
      processorArray[index].tasks.push(JSON.stringify(workers[i]));
    }
    return processorArray;
  };
}
module.exports = processCordinator;
var processCordinator = module.exports = exports = new processCordinator;
