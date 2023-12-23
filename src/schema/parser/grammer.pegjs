columnRule = columnValidationExpr*

columnValidationExpr = combinatorialExpr / nonCombinatorialExpr

combinatorialExpr = orExpr / andExpr

orExpr = left:nonCombinatorialExpr [ ]+ "or" [ ]+ right:columnValidationExpr { return { type: 'or', left: left, right: right } };

andExpr = left:nonCombinatorialExpr andOrWhiteSpaceLiteral right:columnValidationExpr { return { type: 'and', left: left, right: right } };

andOrWhiteSpaceLiteral = [ ]+ "and" [ ]+ / [ ]+

nonCombinatorialExpr = nonConditionalExpr

nonConditionalExpr = singleExpr / parenthesizedExpr

singleExpr = notEmptyExpr / emptyExpr / isExpr / notExpr / uniqueExpr / rangeExpr / lengthExpr / regExpExpr / integerExpr / floatExpr / anyExpr

notEmptyExpr = "notEmpty" { return { type: 'notEmpty', text: text() }; }

emptyExpr = "empty" { return { type: 'empty', text: text() }; }

isExpr = "is(" _ value:stringProvider _ ")" { return { type: 'is', value: value, text: text() }; }

notExpr = "not(" _ value:stringProvider _ ")" { return { type: 'not', value: value, text: text() }; }

uniqueExpr = "unique" { return { type: 'unique', text: text() }; }

rangeExpr = "range(" _ min:integerLiteralOrAny _ "," _ max:integerLiteralOrAny _ ")" { return { type: 'range', min: min, max: max, text: text() };}

lengthExpr = "length(" _ min:(value:positiveIntegerOrAny _ "," { return value; })? _ max:positiveIntegerOrAny _ ")" { return { type: 'length', min: min, max: max, text: text() }; }

regExpExpr = "regex(" _ value:stringLiteral _ ")" { return { type: 'regex', value: value, text: text() }; }

integerExpr = "integer" { return { type: 'integer', text: text() }; }

floatExpr = "float" { return { type: 'float', text: text() }; }

anyExpr = "any(" _ leftValue:stringProvider _ rightValues:("," _ value:stringProvider _ { return value; } )* ")" { return { type: 'any', left: leftValue, right: rightValues, text: text() }; }

stringProvider = stringLiteral

stringLiteral = '"' value:[^"]* '"' { return value.join(""); } // any character except '"' 

positiveIntegerLiteral = value:[0-9]+ { return parseInt(value.join(""), 10); }

integerLiteral = "-"?[0-9]+ { return parseInt(text(), 10); }

wildcardLiteral = "*"

positiveIntegerOrAny = positiveIntegerLiteral / wildcardLiteral

integerLiteralOrAny = integerLiteral / wildcardLiteral

parenthesizedExpr = "(" _ values:columnValidationExpr+ _ ")" { return { type: 'parentheses', values: values }; }

_ "whitespace" = [ ]*