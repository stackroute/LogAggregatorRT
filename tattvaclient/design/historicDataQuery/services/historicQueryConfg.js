angular.module("tattva")
.service('historicQueryConfg', ['$http','namespaceFactory','streamService', function($http,namespaceFactory,streamService){

	this.getOutcomeOptions=function(){
		return ["Only Matches","Only non Matches","All Data"];
	}



	this.getfieldOption=function(){
		return  [

		{
			"name": "Input Value",
			"controller": "historicInputValueCtrl",
			"template": "inputValue",
			"type": "inputValue",
			"icon":"create",
			"shortexpr":"Value<Selected Value>",
			"tip":"Enter your own Value"
		},
		{
			"type": "DataFields",
			"name": "Data fields from LogData",
			"controller": "historicDataFieldsCtrl",
			"template": "dataFields",
			"icon":"text_format",
			"shortexpr":"DataField(<Selected DataField>)",
			"tip":"Use a Field from the selected LogData"
		}

		]
	}

	this.outputDataOption=function(){
		return  [

		{
			"type": "Function",
			"name": "Aggregate Function",
			"controller": "mongodbFunctionCtrl",
			"template": "function",
			"icon":"done_all",
			"shortexpr":"Aggregate Function Name(<DataFields>)",
			"tip":"Apply Query function on selected Datafields"
		},
		{
			"type": "DataFields",
			"name": "Data fields from LogData",
			"controller": "historicDataFieldCtrl",
			"template": "dataFields",
			"icon":"text_format",
			"shortexpr":"DataField(<Selected DataField>)",
			"tip":"Select Output Field from the selected LogData"
		}

		]
	}

	this.getFunctionsOption=function(){
		return ["SUM","AVERAGE","MINIMUM","MAXIMUM","FIRST","LAST","STANDARD DEVIATION"];
	}


	this.getoperatorOption=function(){
		return ["!=", ">", ">=", "<", "<=","==", "like", "exists"];
	}

}]);
