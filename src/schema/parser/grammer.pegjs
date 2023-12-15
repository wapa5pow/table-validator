columnRule = columnValidationExpr*

columnValidationExpr = combinatorialExpr / nonCombinatorialExpr

combinatorialExpr = orExpr / andExpr

orExpr = left:nonCombinatorialExpr " or " right:columnValidationExpr { return { type: 'or', left: left, right: right } };

andExpr = left:nonCombinatorialExpr " and " right:columnValidationExpr { return { type: 'and', left: left, right: right } };

nonCombinatorialExpr = nonConditionalExpr

nonConditionalExpr = singleExpr / parenthesizedExpr

singleExpr = notEmptyExpr / isExpr / uniqueExpr / rangeExpr

notEmptyExpr = "notEmpty" { return { type: 'notEmpty' }; }

isExpr = "is(" value:stringProvider ")" { return { type: 'is', value: value }; }

uniqueExpr = "unique" { return { type: 'unique' }; }

rangeExpr = "range(" min:positiveIntegerOrAny "," max:positiveIntegerOrAny ")" { return { type: 'range', min: min, max: max, };}

stringProvider = stringLiteral

stringLiteral = '"' value:[^"]* '"' { return value.join(""); } // any character except '"' 

positiveIntegerLiteral = value:[0-9]+ { return value.join(""); }

wildcardLiteral = "*"

positiveIntegerOrAny = positiveIntegerLiteral / wildcardLiteral

parenthesizedExpr = "(" values:columnValidationExpr+ ")" { return { type: 'array', values: values }; }