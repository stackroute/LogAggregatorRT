var fieldoperator = {
  evaluate: function(operator, a, b) {
    var result = undefined;
    var lhs=a;
    var rhs=b;
    var oprtr=operator;
    var result=undefined;
    if (oprtr=='+') {
      result = (lhs + rhs);
    }
    else if (oprtr=='-') {
      result = (lhs - rhs);
    }
    else if (oprtr=='/') {
      result = (lhs / rhs);
    }
    else if (oprtr=='*') {
      result = (lhs * rhs);
    }
    else if (oprtr=='%') {
      result = (lhs % rhs);
    }
    else if (oprtr=='==') {
      result = (lhs == rhs);
    }
    else if (oprtr=='!=') {
      result = (lhs != rhs);
    }
    else if (oprtr=='>=') {
      result = (lhs >= rhs);
    }
    else if (oprtr=='<=') {
      result = (lhs <= rhs);
    }
    else if (oprtr == '>') {
      result = (lhs > rhs);
    }else if (oprtr == '<') {
      result = (lhs < rhs);
    }
    return result;
  }
}

module.exports = fieldoperator;
