module.exports=function()
{
  var functionProvider = require("../datahistoricQprovider");
  var MongoClient = require('mongodb').MongoClient;
  var queryResult={};

  function findResult(db, collnName, pipelineStageArray, scb, ecb, callback) {
    queryResult={};
    db.collection(collnName).aggregate(pipelineStageArray).toArray(function(err, result) {
     if(result){
       for(results in result){
        for(i in result[results]){
          if(i != '_id'){
            queryResult[i]=result[results][i];
          }
        }
      } 
      queryResult = queryResult;
      scb(queryResult);
      callback();
    }
    if(err){
      ecb(err);
      callback();
    }
  });
  }

  function getDBFunction(fnName){
    if(fnName === 'AVERAGE'){
      return '$avg';
    }
    if(fnName === 'SUM'){
      return '$sum';
    }
    if(fnName === 'FIRST'){
      return '$first';
    }
    if(fnName === 'LAST'){
      return '$last';
    }
    if(fnName === 'MAXIMUM'){
      return '$max';
    }
    if(fnName === 'MINIMUM'){
      return '$min';
    }
    if(fnName === 'STANDARD DEVIATION'){
      return '$stdDevSamp';
    }
  }

  function getComparisonFunction(fnName){
    if(fnName === '=='){
      return '$eq';
    }
    if(fnName === '!='){
      return '$ne';
    }
    if(fnName === '>='){
      return '$gte';
    }
    if(fnName === '>'){
      return '$gt';
    }
    if(fnName === '<'){
      return '$lt';
    }
    if(fnName === '<='){
      return '$lte';
    }
    if(fnName === 'like'){
      return '$elemMatch';
    }
    if(fnName === 'exists'){
      return '$exists';
    }
  }

  return{
    test : function(queryObject,scb,ecb) {
      if(Array.isArray(queryObject) && queryObject.length){
        queryObject = queryObject[0];
      }
      var collnName = (queryObject.watchlist.replace(/\s/g, '_').toLowerCase()) + "_outcomes";
      var dbName = queryObject.orgsite+"_historic";

      var groupAggregate = {_id : "$orgsite"};  

      for(field in queryObject.outputFields){
        if(queryObject.outputFields[field].function != undefined){
          var dbFunction = getDBFunction(queryObject.outputFields[field].function);
          var functionResult1 = queryObject.outputFields[field].function.toLowerCase();
          for(dataField in queryObject.outputFields[field].dataFields){
            var functionResult2 = queryObject.outputFields[field].dataFields[dataField];
            var functionResult = functionResult1+functionResult2;
            var functionObj = {};
            functionObj[dbFunction] = "$data."+queryObject.outputFields[field].dataFields[dataField];
            groupAggregate[functionResult] = functionObj;
          }
        }
        else{
          // for(dataField in queryObject.outputFields[field].dataFields){
          //   var functionResult = queryObject.outputFields[field].dataFields[dataField];
          //   groupAggregate[functionResult]="'$"+functionResult+"'";
          // }
        }
      }

      var timeField = "data."+queryObject.queryTimeField;
      var matchObject = {};
      var toDate = JSON.stringify(new Date(queryObject.toDateTime)).replace('"', '').replace('"', '');
      var fromDate = JSON.stringify(new Date(queryObject.fromDateTime)).replace('"', '').replace('"', '');

      matchObject[timeField]= {$gte : fromDate, $lte : toDate};
      for(criteria in queryObject.queryCriteria){
        if(queryObject.queryCriteria[criteria].rhs != undefined && queryObject.queryCriteria[criteria].lhs != undefined){
          var comparisonFunction = getComparisonFunction(queryObject.queryCriteria[criteria].operator);
          var comparisonObject = {};
          if(queryObject.queryCriteria[criteria].rhs.type == "Data fields from LogData"){
            comparisonObject[comparisonFunction] = "data."+queryObject.queryCriteria[criteria].rhs.value;
          }
          else{
            try{
            comparisonObject[comparisonFunction] = parseFloat(queryObject.queryCriteria[criteria].rhs.value);  
            }
            catch(e){
            comparisonObject[comparisonFunction] = queryObject.queryCriteria[criteria].rhs.value;
          }
        }
          matchObject["data."+queryObject.queryCriteria[criteria].lhs] = comparisonObject; 
        }           
      }

      var matchStage={};
      matchStage['$match']=matchObject;
      var groupStage={};
      groupStage['$group']=groupAggregate;

      var pipelineStageArray=[];
      pipelineStageArray.push(matchStage);
      pipelineStageArray.push(groupStage);

      var url = 'mongodb://localhost:27017/'+dbName;
      MongoClient.connect(url, function(err, db) {
        findResult(db, collnName, pipelineStageArray, scb, ecb, function() {
         db.close();
       });
      });
    }
  }

}