angular.module("tattva")
.service('loadExprData', ['$http', function($http){
this.getConstants=function(){
return [{"Name":"PI","Value":"3.14"},{"Name":"e","Value":"2.74"},{"Name":"φ","Value":"1.618033988749894848204586"}]
}
this.getFunction=function(){
return [{
		"fun_name": "Sum",
		"Descr": "This is an invalid function",
		"var": [{param1:"Number x"},{param2:"Number y"}],
		"fun": "int Sum(int x,char y){ return x+y};"
	},
{
		"fun_name": "Subtract",
		"Descr": "This is an invalid function",
		"var": ["Number x"],
		"fun": "int Sum(int x,char y){ return x+y};"
	}
]
}
}]);
