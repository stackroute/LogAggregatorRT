angular.module("tattva")
.service('getHistoricData', ['$http','$q', function($http,$q){
	this.getHistoricData= function(historicDataObj) {
    	return $q(function(resolve, reject) {
    		$http.post('/historicQuery/historicData/'+historicDataObj, historicDataObj)
    		.then(function(res) {
    			resolve(res.data);
    		},
    		function(res) {
    			reject(res.data);
    		});
    	});
    };    
}]);

