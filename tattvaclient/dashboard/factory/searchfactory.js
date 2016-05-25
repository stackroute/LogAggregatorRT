// take the watchlist id from the slidefactory and send watchlist data
angular.module('tattva')
.factory('searchFactory', ['$http',function($http){
  var wldata=[
    {
      "wlid": "1",
      "charttype":"graph",
      "datatype":"data",
      "wldef":{
        "CountryName": "India",
        "CountryCode": "IND"
      },
      "value":[8, 3, 7],
      "size" : "30",
      "slideone":"B",
      "slidetwo":"A"
    },
    {
      "wlid": "2",
      "charttype":"flow",
      "datatype":"rawdata",
      "wldef":
      {
        "CountryName": "Pakistan",
        "CountryCode": "PAK"
      },
      "value":[15, 30, 27],
      "size" : "50",
      "slideone":"B",
      "slidetwo":"A"
    },
{	"wlid": "3",
"charttype":"flow",
"datatype":"rawdata",
"wldef":{
  "CountryName": "America",
  "CountryCode": "USA"
},
"value":[38, 13, 70],
"size" : "70",
"slideone":"A",
"slidetwo":"B"
},
{"wlid": "4",
"charttype":"graph",
"datatype":"data",
"wldef":{
  "CountryName": "Britan",
  "CountryCode": "UK"
},
"value":[58, 32, 17],
"size" : "30",
"slideone":"B",
"slidetwo":"A"
},
{"wlid": "5",
"charttype":"graph",
"datatype":"data",
"wldef":{
  "CountryName": "Shrilanka",
  "CountryCode": "SK"
},
"value":[78, 12, 37],
"size" : "30",
"slideone":"A",
"slidetwo":"B"
},
{"wlid": "6",
"charttype":"flow",
"datatype":"data",
"wldef":{
  "CountryName": "Japan",
  "CountryCode": "JP"
},
"value":[28, 32, 17],
"size" : "30",
"slideone":"B",
"slidetwo":"A"
}
];

 var factory = {
   getWlObj: function(wlid) {
     for(i = 0; i < wldata.length; i++) {
       var wlObj = wldata[i];
       if (wlObj.wlid == wlid) {
        //  console.log("insididdd"+wlObj);
         return wlObj;
       }
     }
   }
 }
 return factory;
}]);

{}
