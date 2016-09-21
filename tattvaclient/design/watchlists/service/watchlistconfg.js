angular.module("tattva")
.service('watchlistconfg', ['$http','namespaceFactory','streamService', function($http,namespaceFactory,streamService){

    this.getOutcomeOptions=function(){
      return ["Only Matches","Only non Matches","All Data"];
    }



  this.getfieldOption=function(){
        return  [
           {
             "type": "Accumulate",
             "name": "Accumulate",
             "controller": "AccumulateCtrl",
             "template": "accumulate",
             "icon":"low_priority",
               "shortexpr":"Accumulate(@ criteria for (Period).then (function<Param>)",
               "tip":"Compare against accumulated Data"
           },
           {
             "type": "constant",
             "name": "Constants",
             "controller": "ConstantCtrl",
             "template": "constant",
             "icon":"font_download",
             "shortexpr":"CONST(<Selected Constant>)",
             "tip":"Compare against a constant value"
           },
        {
          "type": "DataFields",
          "name": "Data fields from LogData",
          "controller": "DataFieldsCtrl",
          "template": "DataFields",
          "icon":"text_format",
          "shortexpr":"DataField(<Selected DataField>)",
          "tip":"Use a Field from the selected LogData"
        },
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
          "type": "Function",
          "name": "Function",
          "controller": "FunctionCtrl",
          "template": "function",
          "icon":"done_all",
            "shortexpr":"Function Name(<Param>)",
            "tip":"Compare against a Function returned Value"
        },
        {
          "type": "compositefunction",
          "name": "Composite Function",
          "controller": "CompositeFunctionCtrl",
          "template": "compositefunction",
          "icon":"streetview",
            "shortexpr":"Composite Function Name(<Param>)",
            "tip":"Compare against a Composite Function returned Value"
        },
        {
          "type": "historicData",
          "name": "Historic Data",
          "controller": "HistoricDataCtrl",
          "template": "historicData",
          "icon":"archive",
            "shortexpr":"Historic function(function name)",
            "tip":"Compare against Historic Data"
        }
        ]

      }


      this.getoperatorOption=function(){
        return ["+", "-", "/", "*", "%", "^", "==", "!=", ">", ">=", "<", "<=", "Concat", "Like", "Not Like", "true", "false"]
      }


}]);
