angular.module('tattva').filter('tattvaHistQExpressionFilter', function() {
    return function(fndef) {
        var exprtext = "";
        if (fndef !== undefined && fndef.outputFields.length >= 1) {
            for(outData in fndef.outputFields){
                if (outData == 0) {
                    exprtext += "SELECT  ";
                }
                if (fndef.outputFields[outData].function) {
                    exprtext += fndef.outputFields[outData].function+"("+fndef.outputFields[outData].dataFields+")";
                }
                else{
                    exprtext += fndef.outputFields[outData].dataFields;
                }
                if(outData != fndef.outputFields.length-1){
                    exprtext += "  AND  ";
                }
            }
        }
        exprtext += "   FROM  "+fndef.watchlist;
        if (fndef !== undefined && fndef.queryCriteria.length >= 1) {
            for(exprData in fndef.queryCriteria){
                if (exprData == 0) {
                    exprtext += "   WHERE  ";
                }

                if (fndef.queryCriteria[exprData].lhs) {
                    exprtext += fndef.queryCriteria[exprData].lhs;
                }

                if (fndef.queryCriteria[exprData].operator) {
                    exprtext += "  "+fndef.queryCriteria[exprData].operator;
                }

                if (fndef.queryCriteria[exprData].rhs.value) {
                    exprtext += "  "+fndef.queryCriteria[exprData].rhs.type+"("+fndef.queryCriteria[exprData].rhs.value+")";
                }
                if(exprData != fndef.queryCriteria.length-1){
                    exprtext += "  AND  ";
                }
            }
        }
        return exprtext;
    }
});