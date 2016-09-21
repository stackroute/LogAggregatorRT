angular.module('tattva')
.filter(
	'role',function(){
		return function(role){
			if(role == 'ORGUSER'){
				return "user";
			}
			return "admin";
		}
	})
.filter(
'startfrom',function(){
		return function(value,start){
			start =+start;
			if(value!=undefined){
			return value.slice(start);}
			else{
				return value;
			}
		}
	});