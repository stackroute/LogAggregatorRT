module.exports = function() {

    var compositeFunction_router = require("../../compositefunction/compositefunction_routes");

    return {
        execute: function(functionObject, paramObj) {

            var functionProvider = require("../datafnprovider");
            var result = [];
            var i = 0;


            if (functionObject != undefined) {

                for (expr in functionObject.expression) {

                    if (expr < functionObject.expression.length) {
                        var fnParamData = [];

                        fnParamData.push(parseFloat(paramObj[functionObject.expression[expr].lhs.varmap[0].targetvar]));
                        fnParamData.push(parseFloat(paramObj[functionObject.expression[expr].lhs.varmap[1].targetvar]));


                        var functionModule = new functionProvider(functionObject.expression[expr].lhs.name);
                        var lhs = functionModule.evaluate(fnParamData);

                        var fnParamData = [];
                        fnParamData.push(parseFloat(paramObj[functionObject.expression[expr].rhs.varmap[0].targetvar]));
                        fnParamData.push(parseFloat(paramObj[functionObject.expression[expr].rhs.varmap[1].targetvar]));
                        var functionModule = new functionProvider(functionObject.expression[expr].rhs.name);
                        var rhs = functionModule.evaluate(fnParamData);

                        if (functionObject.expression[expr].operator.name == "+") {

                            result[i] = lhs.output + rhs.output;
                        }
                        if (functionObject.expression[expr].operator.name == "-") {

                            result[i] = lhs.output - rhs.output;
                        }
                        if (functionObject.expression[expr].operator.name == "*") {
                            result[i] = lhs.output * rhs.output;
                        }
                        if (functionObject.expression[expr].operator.name == "/") {
                            result[i] = lhs.output / rhs.output;
                        }
                        i++;
                        result[i] = functionObject.expression[expr].join_By.name;
                        i++;
                    }
                }
            }
            var final = {};
            final.error = false;
            if (result.length > 2) {
                for (var j = 1; j < result.length; j = j + 2) {
                    if (result[j] == "+") {
                        result[j + 1] = result[j - 1] + result[j + 1];
                        final.output = result[j + 1];
                    }
                    if (result[j] == "-") {
                        result[j + 1] = result[j - 1] - result[j + 1];
                        final.output = result[j + 1];
                    }
                    if (result[j] == "*") {
                        result[j + 1] = result[j - 1] * result[j + 1];
                        final.output = result[j + 1];
                    }
                    if (result[j] == "/") {
                        result[j + 1] = result[j - 1] / result[j + 1];
                        final.output = result[j + 1];
                    }
                }
            } else {
                final.output = result[0];
            }


            return final;

        }
    }
}
