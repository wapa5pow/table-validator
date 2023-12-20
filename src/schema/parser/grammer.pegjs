columnRule = columnValidationExpr*

columnValidationExpr = combinatorialExpr / nonCombinatorialExpr

combinatorialExpr = orExpr / andExpr

orExpr = left:nonCombinatorialExpr " or " right:columnValidationExpr { return { type: 'or', left: left, right: right } };

andExpr = left:nonCombinatorialExpr " and " right:columnValidationExpr { return { type: 'and', left: left, right: right } };

nonCombinatorialExpr = nonConditionalExpr

nonConditionalExpr = singleExpr / parenthesizedExpr

singleExpr = notEmptyExpr / emptyExpr / isExpr / notExpr / uniqueExpr / rangeExpr / lengthExpr / regExpExpr / integerExpr / floatExpr / anyExpr

notEmptyExpr = "notEmpty" { return { type: 'notEmpty' }; }

emptyExpr = "empty" { return { type: 'empty' }; }

isExpr = "is(" value:stringProvider ")" { return { type: 'is', value: value }; }

notExpr = "not(" value:stringProvider ")" { return { type: 'not', value: value }; }

uniqueExpr = "unique" { return { type: 'unique' }; }

rangeExpr = "range(" min:integerLiteralOrAny "," max:integerLiteralOrAny ")" { return { type: 'range', min: min, max: max, };}

lengthExpr = "length(" min:(value:positiveIntegerOrAny "," { return value; })? max:positiveIntegerOrAny ")" { return { type: 'length', min: min, max: max}; }

regExpExpr = "regex(" value:stringLiteral ")" { return { type: 'regex', value: value }; }

integerExpr = "integer" { return { type: 'integer' }; }

floatExpr = "float" { return { type: 'float' }; }

anyExpr = "any(" leftValue:stringProvider rightValues:("," value:stringProvider { return value; })*  ")" { return { type: 'any', left: leftValue, right: rightValues, text: text() }; }

stringProvider = stringLiteral

stringLiteral = '"' value:[^"]* '"' { return value.join(""); } // any character except '"' 

positiveIntegerLiteral = value:[0-9]+ { return parseInt(value.join(""), 10); }

integerLiteral = "-"?[0-9]+ { return parseInt(text(), 10); }

wildcardLiteral = "*"

positiveIntegerOrAny = positiveIntegerLiteral / wildcardLiteral

integerLiteralOrAny = integerLiteral / wildcardLiteral

parenthesizedExpr = "(" values:columnValidationExpr+ ")" { return { type: 'parentheses', values: values }; }