columnRule = columnValidationExpr

columnValidationExpr = combinatorialExpr / nonCombinatorialExpr

combinatorialExpr = orExpr / andExpr

orExpr = left:nonCombinatorialExpr " or " right:columnValidationExpr { return { type: 'or', left: left, right: right } };

andExpr = left:nonCombinatorialExpr " and " right:columnValidationExpr { return { type: 'and', left: left, right: right } };

nonCombinatorialExpr = nonConditionalExpr

nonConditionalExpr = singleExpr / parenthesizedExpr

singleExpr = notEmptyExpr / isExpr

notEmptyExpr = "notEmpty" { return { type: 'notEmpty' }; }

isExpr = "is(" value:stringProvider ")" { return { type: 'is', value: value }; }

stringProvider = stringLiteral

stringLiteral = '"' value:[^"]* '"' { return value.join(""); } // any character except '"' 

parenthesizedExpr = "(" value:columnValidationExpr+ ")" { return value; }