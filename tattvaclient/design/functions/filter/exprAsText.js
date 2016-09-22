angular.module("tattva")
    .filter('functionListExpr', function() {
        var getExpression = function(fkndef) {

            var expr = "";
            if (fkndef != undefined) {

                expr = expr + fkndef.name + '(';
                for (i in fkndef.varmap) {
                    expr = expr + fkndef.varmap[i].targetvar + ',';
                }
                expr = expr.slice(0, -1);
                expr = expr + ')';

            }
            return expr;
        }
        return function(functiondef) {
            //

            if (functiondef.expression) {
                // 
                // 
                var exprAsText = "";
                functiondef.expression.forEach(function(expression) {

                    exprAsText = exprAsText + '(';
                    if (expression.lhs.name != "") {
                        exprAsText = exprAsText + getExpression(expression.lhs);
                    }

                    if (expression.operator != undefined) {
                        exprAsText = exprAsText + expression.operator.name;

                    }
                    if (expression.rhs.name != "") {
                        exprAsText = exprAsText + getExpression(expression.rhs);
                    }
                    exprAsText = exprAsText + ')';
                    if (expression.join_By != undefined) {

                        if (expression.join_By.name != "") {
                            exprAsText = exprAsText + expression.join_By.name;
                        }

                    }

                });


            }
            return exprAsText;
        }


    })
