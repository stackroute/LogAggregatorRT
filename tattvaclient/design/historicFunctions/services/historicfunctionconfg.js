angular.module("tattva")
.service('historicfunctionconfg', ['$http','namespaceFactory','streamService', function($http,namespaceFactory,streamService){

	this.getOutcomeOptions=function(){
		return ["Only Matches","Only non Matches","All Data"];
	}



	this.getfieldOption=function(){
		return  [

		{
			"name": "Input Value",
			"controller": "InputValueCtrl",
			"template": "inputValue",
			"type": "inputvalue",
			"icon":"create",
			"shortexpr":"Value<Selected Value>",
			"tip":"Enter your own Value"
		},
		{
			"type": "DataFields",
			"name": "Data fields from LogData",
			"controller": "historicDataFieldsCtrl",
			"template": "DataFields",
			"icon":"text_format",
			"shortexpr":"DataField(<Selected DataField>)",
			"tip":"Use a Field from the selected LogData"
		}

		]
	}

	this.requireddataoption=function(){
		return  [

		{
			"type": "Function",
			"name": "Aggregate Function",
			"controller": "mongodbFunctionCtrl",
			"template": "Function",
			"icon":"done_all",
			"shortexpr":"Aggregate Function Name(<DataFields>)",
			"tip":"Apply Query function on selected Datafields"
		},
		{
			"type": "DataFields",
			"name": "Data fields from LogData",
			"controller": "requiredDataFieldCtrl",
			"template": "DataFields",
			"icon":"text_format",
			"shortexpr":"DataField(<Selected DataField>)",
			"tip":"Select Output Field from the selected LogData"
		}

		]
	}

	this.getfunctionsOption=function(){
		return ["SUM","MULTIPLY","AVERAGE","MINIMUM","MAXIMUM","FIRST","LAST","COUNT","STANDARD DEVIATION","Sort(Asc)","Sort(Des)"]
	}


	this.getoperatorOption=function(){
		return ["NotEqualTo", "GreaterThan", "GreaterThanEqualTo", "LessThan", "LessThanEqualTo","EqualTo", "ElementMatch", "Exists"]
	}

}]);
