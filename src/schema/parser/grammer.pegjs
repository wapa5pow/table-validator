columnRule = columnValidationExpr

columnValidationExpr = combinatorialExpr / nonCombinatorialExpr

combinatorialExpr = orExpr / andExpr

orExpr = left:nonCombinatorialExpr " or " right:columnValidationExpr { return { type: 'or', left: left, right: right } };

andExpr = left:nonCombinatorialExpr " and " right:columnValidationExpr { return { type: 'and', left: left, right: right } };

nonCombinatorialExpr = nonConditionalExpr

nonConditionalExpr = singleExpr / parenthesizedExpr

singleExpr = notEmptyExpr / isExpr / unique

notEmptyExpr = "notEmpty" { return { type: 'notEmpty' }; }

isExpr = "is(" value:stringProvider ")" { return { type: 'is', value: value }; }

unique = "unique" { return { type: 'unique' }; }

stringProvider = stringLiteral

stringLiteral = '"' value:[^"]* '"' { return value.join(""); } // any character except '"' 

parenthesizedExpr = "(" values:columnValidationExpr+ ")" { return { type: 'array', values: values }; }