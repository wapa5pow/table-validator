/* eslint-disable */



const peggyParser: {parse: any, SyntaxError: any, DefaultTracer?: any} = // Generated by Peggy 3.0.2.
//
// https://peggyjs.org/
// @ts-ignore
(function() {
// @ts-ignore
  "use strict";

// @ts-ignore
function peg$subclass(child, parent) {
// @ts-ignore
  function C() { this.constructor = child; }
// @ts-ignore
  C.prototype = parent.prototype;
// @ts-ignore
  child.prototype = new C();
}

// @ts-ignore
function peg$SyntaxError(message, expected, found, location) {
// @ts-ignore
  var self = Error.call(this, message);
  // istanbul ignore next Check is a necessary evil to support older environments
// @ts-ignore
  if (Object.setPrototypeOf) {
// @ts-ignore
    Object.setPrototypeOf(self, peg$SyntaxError.prototype);
  }
// @ts-ignore
  self.expected = expected;
// @ts-ignore
  self.found = found;
// @ts-ignore
  self.location = location;
// @ts-ignore
  self.name = "SyntaxError";
// @ts-ignore
  return self;
}

// @ts-ignore
peg$subclass(peg$SyntaxError, Error);

// @ts-ignore
function peg$padEnd(str, targetLength, padString) {
// @ts-ignore
  padString = padString || " ";
// @ts-ignore
  if (str.length > targetLength) { return str; }
// @ts-ignore
  targetLength -= str.length;
// @ts-ignore
  padString += padString.repeat(targetLength);
// @ts-ignore
  return str + padString.slice(0, targetLength);
}

// @ts-ignore
peg$SyntaxError.prototype.format = function(sources) {
// @ts-ignore
  var str = "Error: " + this.message;
// @ts-ignore
  if (this.location) {
// @ts-ignore
    var src = null;
// @ts-ignore
    var k;
// @ts-ignore
    for (k = 0; k < sources.length; k++) {
// @ts-ignore
      if (sources[k].source === this.location.source) {
// @ts-ignore
        src = sources[k].text.split(/\r\n|\n|\r/g);
// @ts-ignore
        break;
      }
    }
// @ts-ignore
    var s = this.location.start;
// @ts-ignore
    var offset_s = (this.location.source && (typeof this.location.source.offset === "function"))
// @ts-ignore
      ? this.location.source.offset(s)
// @ts-ignore
      : s;
// @ts-ignore
    var loc = this.location.source + ":" + offset_s.line + ":" + offset_s.column;
// @ts-ignore
    if (src) {
// @ts-ignore
      var e = this.location.end;
// @ts-ignore
      var filler = peg$padEnd("", offset_s.line.toString().length, ' ');
// @ts-ignore
      var line = src[s.line - 1];
// @ts-ignore
      var last = s.line === e.line ? e.column : line.length + 1;
// @ts-ignore
      var hatLen = (last - s.column) || 1;
// @ts-ignore
      str += "\n --> " + loc + "\n"
// @ts-ignore
          + filler + " |\n"
// @ts-ignore
          + offset_s.line + " | " + line + "\n"
// @ts-ignore
          + filler + " | " + peg$padEnd("", s.column - 1, ' ')
// @ts-ignore
          + peg$padEnd("", hatLen, "^");
// @ts-ignore
    } else {
// @ts-ignore
      str += "\n at " + loc;
    }
  }
// @ts-ignore
  return str;
};

// @ts-ignore
peg$SyntaxError.buildMessage = function(expected, found) {
// @ts-ignore
  var DESCRIBE_EXPECTATION_FNS = {
// @ts-ignore
    literal: function(expectation) {
// @ts-ignore
      return "\"" + literalEscape(expectation.text) + "\"";
    },

// @ts-ignore
    class: function(expectation) {
// @ts-ignore
      var escapedParts = expectation.parts.map(function(part) {
// @ts-ignore
        return Array.isArray(part)
// @ts-ignore
          ? classEscape(part[0]) + "-" + classEscape(part[1])
// @ts-ignore
          : classEscape(part);
      });

// @ts-ignore
      return "[" + (expectation.inverted ? "^" : "") + escapedParts.join("") + "]";
    },

// @ts-ignore
    any: function() {
// @ts-ignore
      return "any character";
    },

// @ts-ignore
    end: function() {
// @ts-ignore
      return "end of input";
    },

// @ts-ignore
    other: function(expectation) {
// @ts-ignore
      return expectation.description;
    }
  };

// @ts-ignore
  function hex(ch) {
// @ts-ignore
    return ch.charCodeAt(0).toString(16).toUpperCase();
  }

// @ts-ignore
  function literalEscape(s) {
// @ts-ignore
    return s
// @ts-ignore
      .replace(/\\/g, "\\\\")
// @ts-ignore
      .replace(/"/g,  "\\\"")
// @ts-ignore
      .replace(/\0/g, "\\0")
// @ts-ignore
      .replace(/\t/g, "\\t")
// @ts-ignore
      .replace(/\n/g, "\\n")
// @ts-ignore
      .replace(/\r/g, "\\r")
// @ts-ignore
      .replace(/[\x00-\x0F]/g,          function(ch) { return "\\x0" + hex(ch); })
// @ts-ignore
      .replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) { return "\\x"  + hex(ch); });
  }

// @ts-ignore
  function classEscape(s) {
// @ts-ignore
    return s
// @ts-ignore
      .replace(/\\/g, "\\\\")
// @ts-ignore
      .replace(/\]/g, "\\]")
// @ts-ignore
      .replace(/\^/g, "\\^")
// @ts-ignore
      .replace(/-/g,  "\\-")
// @ts-ignore
      .replace(/\0/g, "\\0")
// @ts-ignore
      .replace(/\t/g, "\\t")
// @ts-ignore
      .replace(/\n/g, "\\n")
// @ts-ignore
      .replace(/\r/g, "\\r")
// @ts-ignore
      .replace(/[\x00-\x0F]/g,          function(ch) { return "\\x0" + hex(ch); })
// @ts-ignore
      .replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) { return "\\x"  + hex(ch); });
  }

// @ts-ignore
  function describeExpectation(expectation) {
// @ts-ignore
    return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
  }

// @ts-ignore
  function describeExpected(expected) {
// @ts-ignore
    var descriptions = expected.map(describeExpectation);
// @ts-ignore
    var i, j;

// @ts-ignore
    descriptions.sort();

// @ts-ignore
    if (descriptions.length > 0) {
// @ts-ignore
      for (i = 1, j = 1; i < descriptions.length; i++) {
// @ts-ignore
        if (descriptions[i - 1] !== descriptions[i]) {
// @ts-ignore
          descriptions[j] = descriptions[i];
// @ts-ignore
          j++;
        }
      }
// @ts-ignore
      descriptions.length = j;
    }

// @ts-ignore
    switch (descriptions.length) {
// @ts-ignore
      case 1:
// @ts-ignore
        return descriptions[0];

// @ts-ignore
      case 2:
// @ts-ignore
        return descriptions[0] + " or " + descriptions[1];

// @ts-ignore
      default:
// @ts-ignore
        return descriptions.slice(0, -1).join(", ")
// @ts-ignore
          + ", or "
// @ts-ignore
          + descriptions[descriptions.length - 1];
    }
  }

// @ts-ignore
  function describeFound(found) {
// @ts-ignore
    return found ? "\"" + literalEscape(found) + "\"" : "end of input";
  }

// @ts-ignore
  return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
};

// @ts-ignore
function peg$parse(input, options) {
// @ts-ignore
  options = options !== undefined ? options : {};

// @ts-ignore
  var peg$FAILED = {};
// @ts-ignore
  var peg$source = options.grammarSource;

// @ts-ignore
  var peg$startRuleFunctions = { columnRule: peg$parsecolumnRule };
// @ts-ignore
  var peg$startRuleFunction = peg$parsecolumnRule;

// @ts-ignore
  var peg$c0 = " or ";
  var peg$c1 = " and ";
  var peg$c2 = "notEmpty";
  var peg$c3 = "is(";
  var peg$c4 = ")";
  var peg$c5 = "unique";
  var peg$c6 = "range(";
  var peg$c7 = ",";
  var peg$c8 = "length(";
  var peg$c9 = "regex(";
  var peg$c10 = "\"";
  var peg$c11 = "*";
  var peg$c12 = "(";

  var peg$r0 = /^[^"]/;
  var peg$r1 = /^[0-9]/;

  var peg$e0 = peg$literalExpectation(" or ", false);
  var peg$e1 = peg$literalExpectation(" and ", false);
  var peg$e2 = peg$literalExpectation("notEmpty", false);
  var peg$e3 = peg$literalExpectation("is(", false);
  var peg$e4 = peg$literalExpectation(")", false);
  var peg$e5 = peg$literalExpectation("unique", false);
  var peg$e6 = peg$literalExpectation("range(", false);
  var peg$e7 = peg$literalExpectation(",", false);
  var peg$e8 = peg$literalExpectation("length(", false);
  var peg$e9 = peg$literalExpectation("regex(", false);
  var peg$e10 = peg$literalExpectation("\"", false);
  var peg$e11 = peg$classExpectation(["\""], true, false);
  var peg$e12 = peg$classExpectation([["0", "9"]], false, false);
  var peg$e13 = peg$literalExpectation("*", false);
  var peg$e14 = peg$literalExpectation("(", false);
// @ts-ignore

  var peg$f0 = function(left, right) {// @ts-ignore
 return { type: 'or', left: left, right: right } };// @ts-ignore

  var peg$f1 = function(left, right) {// @ts-ignore
 return { type: 'and', left: left, right: right } };// @ts-ignore

  var peg$f2 = function() {// @ts-ignore
 return { type: 'notEmpty' }; };// @ts-ignore

  var peg$f3 = function(value) {// @ts-ignore
 return { type: 'is', value: value }; };// @ts-ignore

  var peg$f4 = function() {// @ts-ignore
 return { type: 'unique' }; };// @ts-ignore

  var peg$f5 = function(min, max) {// @ts-ignore
 return { type: 'range', min: min, max: max, };};// @ts-ignore

  var peg$f6 = function(value) {// @ts-ignore
 return value; };// @ts-ignore

  var peg$f7 = function(min, max) {// @ts-ignore
 return { type: 'length', min: min, max: max}; };// @ts-ignore

  var peg$f8 = function(value) {// @ts-ignore
 return { type: 'regex', value: value }; };// @ts-ignore

  var peg$f9 = function(value) {// @ts-ignore
 return value.join(""); };// @ts-ignore

  var peg$f10 = function(value) {// @ts-ignore
 return parseInt(value.join(""), 10); };// @ts-ignore

  var peg$f11 = function(values) {// @ts-ignore
 return { type: 'array', values: values }; };
// @ts-ignore
  var peg$currPos = 0;
// @ts-ignore
  var peg$savedPos = 0;
// @ts-ignore
  var peg$posDetailsCache = [{ line: 1, column: 1 }];
// @ts-ignore
  var peg$maxFailPos = 0;
// @ts-ignore
  var peg$maxFailExpected = [];
// @ts-ignore
  var peg$silentFails = 0;

// @ts-ignore
  var peg$result;

// @ts-ignore
  if ("startRule" in options) {
// @ts-ignore
    if (!(options.startRule in peg$startRuleFunctions)) {
// @ts-ignore
      throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
    }

// @ts-ignore
    peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
  }

// @ts-ignore
  function text() {
// @ts-ignore
    return input.substring(peg$savedPos, peg$currPos);
  }

// @ts-ignore
  function offset() {
// @ts-ignore
    return peg$savedPos;
  }

// @ts-ignore
  function range() {
// @ts-ignore
    return {
// @ts-ignore
      source: peg$source,
// @ts-ignore
      start: peg$savedPos,
// @ts-ignore
      end: peg$currPos
    };
  }

// @ts-ignore
  function location() {
// @ts-ignore
    return peg$computeLocation(peg$savedPos, peg$currPos);
  }

// @ts-ignore
  function expected(description, location) {
// @ts-ignore
    location = location !== undefined
// @ts-ignore
      ? location
// @ts-ignore
      : peg$computeLocation(peg$savedPos, peg$currPos);

// @ts-ignore
    throw peg$buildStructuredError(
// @ts-ignore
      [peg$otherExpectation(description)],
// @ts-ignore
      input.substring(peg$savedPos, peg$currPos),
// @ts-ignore
      location
    );
  }

// @ts-ignore
  function error(message, location) {
// @ts-ignore
    location = location !== undefined
// @ts-ignore
      ? location
// @ts-ignore
      : peg$computeLocation(peg$savedPos, peg$currPos);

// @ts-ignore
    throw peg$buildSimpleError(message, location);
  }

// @ts-ignore
  function peg$literalExpectation(text, ignoreCase) {
// @ts-ignore
    return { type: "literal", text: text, ignoreCase: ignoreCase };
  }

// @ts-ignore
  function peg$classExpectation(parts, inverted, ignoreCase) {
// @ts-ignore
    return { type: "class", parts: parts, inverted: inverted, ignoreCase: ignoreCase };
  }

// @ts-ignore
  function peg$anyExpectation() {
// @ts-ignore
    return { type: "any" };
  }

// @ts-ignore
  function peg$endExpectation() {
// @ts-ignore
    return { type: "end" };
  }

// @ts-ignore
  function peg$otherExpectation(description) {
// @ts-ignore
    return { type: "other", description: description };
  }

// @ts-ignore
  function peg$computePosDetails(pos) {
// @ts-ignore
    var details = peg$posDetailsCache[pos];
// @ts-ignore
    var p;

// @ts-ignore
    if (details) {
// @ts-ignore
      return details;
// @ts-ignore
    } else {
// @ts-ignore
      p = pos - 1;
// @ts-ignore
      while (!peg$posDetailsCache[p]) {
// @ts-ignore
        p--;
      }

// @ts-ignore
      details = peg$posDetailsCache[p];
// @ts-ignore
      details = {
// @ts-ignore
        line: details.line,
// @ts-ignore
        column: details.column
      };

// @ts-ignore
      while (p < pos) {
// @ts-ignore
        if (input.charCodeAt(p) === 10) {
// @ts-ignore
          details.line++;
// @ts-ignore
          details.column = 1;
// @ts-ignore
        } else {
// @ts-ignore
          details.column++;
        }

// @ts-ignore
        p++;
      }

// @ts-ignore
      peg$posDetailsCache[pos] = details;

// @ts-ignore
      return details;
    }
  }

// @ts-ignore
  function peg$computeLocation(startPos, endPos, offset) {
// @ts-ignore
    var startPosDetails = peg$computePosDetails(startPos);
// @ts-ignore
    var endPosDetails = peg$computePosDetails(endPos);

// @ts-ignore
    var res = {
// @ts-ignore
      source: peg$source,
// @ts-ignore
      start: {
// @ts-ignore
        offset: startPos,
// @ts-ignore
        line: startPosDetails.line,
// @ts-ignore
        column: startPosDetails.column
      },
// @ts-ignore
      end: {
// @ts-ignore
        offset: endPos,
// @ts-ignore
        line: endPosDetails.line,
// @ts-ignore
        column: endPosDetails.column
      }
    };
// @ts-ignore
    if (offset && peg$source && (typeof peg$source.offset === "function")) {
// @ts-ignore
      res.start = peg$source.offset(res.start);
// @ts-ignore
      res.end = peg$source.offset(res.end);
    }
// @ts-ignore
    return res;
  }

// @ts-ignore
  function peg$fail(expected) {
// @ts-ignore
    if (peg$currPos < peg$maxFailPos) { return; }

// @ts-ignore
    if (peg$currPos > peg$maxFailPos) {
// @ts-ignore
      peg$maxFailPos = peg$currPos;
// @ts-ignore
      peg$maxFailExpected = [];
    }

// @ts-ignore
    peg$maxFailExpected.push(expected);
  }

// @ts-ignore
  function peg$buildSimpleError(message, location) {
// @ts-ignore
    return new peg$SyntaxError(message, null, null, location);
  }

// @ts-ignore
  function peg$buildStructuredError(expected, found, location) {
// @ts-ignore
    return new peg$SyntaxError(
// @ts-ignore
      peg$SyntaxError.buildMessage(expected, found),
// @ts-ignore
      expected,
// @ts-ignore
      found,
// @ts-ignore
      location
    );
  }

// @ts-ignore
  function // @ts-ignore
peg$parsecolumnRule() {
// @ts-ignore
    var s0, s1;

// @ts-ignore
    s0 = [];
// @ts-ignore
    s1 = peg$parsecolumnValidationExpr();
// @ts-ignore
    while (s1 !== peg$FAILED) {
// @ts-ignore
      s0.push(s1);
// @ts-ignore
      s1 = peg$parsecolumnValidationExpr();
    }

// @ts-ignore
    return s0;
  }

// @ts-ignore
  function // @ts-ignore
peg$parsecolumnValidationExpr() {
// @ts-ignore
    var s0;

// @ts-ignore
    s0 = peg$parsecombinatorialExpr();
// @ts-ignore
    if (s0 === peg$FAILED) {
// @ts-ignore
      s0 = peg$parsenonConditionalExpr();
    }

// @ts-ignore
    return s0;
  }

// @ts-ignore
  function // @ts-ignore
peg$parsecombinatorialExpr() {
// @ts-ignore
    var s0;

// @ts-ignore
    s0 = peg$parseorExpr();
// @ts-ignore
    if (s0 === peg$FAILED) {
// @ts-ignore
      s0 = peg$parseandExpr();
    }

// @ts-ignore
    return s0;
  }

// @ts-ignore
  function // @ts-ignore
peg$parseorExpr() {
// @ts-ignore
    var s0, s1, s2, s3;

// @ts-ignore
    s0 = peg$currPos;
// @ts-ignore
    s1 = peg$parsenonConditionalExpr();
// @ts-ignore
    if (s1 !== peg$FAILED) {
// @ts-ignore
      if (input.substr(peg$currPos, 4) === peg$c0) {
// @ts-ignore
        s2 = peg$c0;
// @ts-ignore
        peg$currPos += 4;
// @ts-ignore
      } else {
// @ts-ignore
        s2 = peg$FAILED;
// @ts-ignore
        if (peg$silentFails === 0) { peg$fail(peg$e0); }
      }
// @ts-ignore
      if (s2 !== peg$FAILED) {
// @ts-ignore
        s3 = peg$parsecolumnValidationExpr();
// @ts-ignore
        if (s3 !== peg$FAILED) {
// @ts-ignore
          peg$savedPos = s0;
// @ts-ignore
          s0 = peg$f0(s1, s3);
// @ts-ignore
        } else {
// @ts-ignore
          peg$currPos = s0;
// @ts-ignore
          s0 = peg$FAILED;
        }
// @ts-ignore
      } else {
// @ts-ignore
        peg$currPos = s0;
// @ts-ignore
        s0 = peg$FAILED;
      }
// @ts-ignore
    } else {
// @ts-ignore
      peg$currPos = s0;
// @ts-ignore
      s0 = peg$FAILED;
    }

// @ts-ignore
    return s0;
  }

// @ts-ignore
  function // @ts-ignore
peg$parseandExpr() {
// @ts-ignore
    var s0, s1, s2, s3;

// @ts-ignore
    s0 = peg$currPos;
// @ts-ignore
    s1 = peg$parsenonConditionalExpr();
// @ts-ignore
    if (s1 !== peg$FAILED) {
// @ts-ignore
      if (input.substr(peg$currPos, 5) === peg$c1) {
// @ts-ignore
        s2 = peg$c1;
// @ts-ignore
        peg$currPos += 5;
// @ts-ignore
      } else {
// @ts-ignore
        s2 = peg$FAILED;
// @ts-ignore
        if (peg$silentFails === 0) { peg$fail(peg$e1); }
      }
// @ts-ignore
      if (s2 !== peg$FAILED) {
// @ts-ignore
        s3 = peg$parsecolumnValidationExpr();
// @ts-ignore
        if (s3 !== peg$FAILED) {
// @ts-ignore
          peg$savedPos = s0;
// @ts-ignore
          s0 = peg$f1(s1, s3);
// @ts-ignore
        } else {
// @ts-ignore
          peg$currPos = s0;
// @ts-ignore
          s0 = peg$FAILED;
        }
// @ts-ignore
      } else {
// @ts-ignore
        peg$currPos = s0;
// @ts-ignore
        s0 = peg$FAILED;
      }
// @ts-ignore
    } else {
// @ts-ignore
      peg$currPos = s0;
// @ts-ignore
      s0 = peg$FAILED;
    }

// @ts-ignore
    return s0;
  }

// @ts-ignore
  function // @ts-ignore
peg$parsenonConditionalExpr() {
// @ts-ignore
    var s0;

// @ts-ignore
    s0 = peg$parsesingleExpr();
// @ts-ignore
    if (s0 === peg$FAILED) {
// @ts-ignore
      s0 = peg$parseparenthesizedExpr();
    }

// @ts-ignore
    return s0;
  }

// @ts-ignore
  function // @ts-ignore
peg$parsesingleExpr() {
// @ts-ignore
    var s0;

// @ts-ignore
    s0 = peg$parsenotEmptyExpr();
// @ts-ignore
    if (s0 === peg$FAILED) {
// @ts-ignore
      s0 = peg$parseisExpr();
// @ts-ignore
      if (s0 === peg$FAILED) {
// @ts-ignore
        s0 = peg$parseuniqueExpr();
// @ts-ignore
        if (s0 === peg$FAILED) {
// @ts-ignore
          s0 = peg$parserangeExpr();
// @ts-ignore
          if (s0 === peg$FAILED) {
// @ts-ignore
            s0 = peg$parselengthExpr();
// @ts-ignore
            if (s0 === peg$FAILED) {
// @ts-ignore
              s0 = peg$parseregExpExpr();
            }
          }
        }
      }
    }

// @ts-ignore
    return s0;
  }

// @ts-ignore
  function // @ts-ignore
peg$parsenotEmptyExpr() {
// @ts-ignore
    var s0, s1;

// @ts-ignore
    s0 = peg$currPos;
// @ts-ignore
    if (input.substr(peg$currPos, 8) === peg$c2) {
// @ts-ignore
      s1 = peg$c2;
// @ts-ignore
      peg$currPos += 8;
// @ts-ignore
    } else {
// @ts-ignore
      s1 = peg$FAILED;
// @ts-ignore
      if (peg$silentFails === 0) { peg$fail(peg$e2); }
    }
// @ts-ignore
    if (s1 !== peg$FAILED) {
// @ts-ignore
      peg$savedPos = s0;
// @ts-ignore
      s1 = peg$f2();
    }
// @ts-ignore
    s0 = s1;

// @ts-ignore
    return s0;
  }

// @ts-ignore
  function // @ts-ignore
peg$parseisExpr() {
// @ts-ignore
    var s0, s1, s2, s3;

// @ts-ignore
    s0 = peg$currPos;
// @ts-ignore
    if (input.substr(peg$currPos, 3) === peg$c3) {
// @ts-ignore
      s1 = peg$c3;
// @ts-ignore
      peg$currPos += 3;
// @ts-ignore
    } else {
// @ts-ignore
      s1 = peg$FAILED;
// @ts-ignore
      if (peg$silentFails === 0) { peg$fail(peg$e3); }
    }
// @ts-ignore
    if (s1 !== peg$FAILED) {
// @ts-ignore
      s2 = peg$parsestringLiteral();
// @ts-ignore
      if (s2 !== peg$FAILED) {
// @ts-ignore
        if (input.charCodeAt(peg$currPos) === 41) {
// @ts-ignore
          s3 = peg$c4;
// @ts-ignore
          peg$currPos++;
// @ts-ignore
        } else {
// @ts-ignore
          s3 = peg$FAILED;
// @ts-ignore
          if (peg$silentFails === 0) { peg$fail(peg$e4); }
        }
// @ts-ignore
        if (s3 !== peg$FAILED) {
// @ts-ignore
          peg$savedPos = s0;
// @ts-ignore
          s0 = peg$f3(s2);
// @ts-ignore
        } else {
// @ts-ignore
          peg$currPos = s0;
// @ts-ignore
          s0 = peg$FAILED;
        }
// @ts-ignore
      } else {
// @ts-ignore
        peg$currPos = s0;
// @ts-ignore
        s0 = peg$FAILED;
      }
// @ts-ignore
    } else {
// @ts-ignore
      peg$currPos = s0;
// @ts-ignore
      s0 = peg$FAILED;
    }

// @ts-ignore
    return s0;
  }

// @ts-ignore
  function // @ts-ignore
peg$parseuniqueExpr() {
// @ts-ignore
    var s0, s1;

// @ts-ignore
    s0 = peg$currPos;
// @ts-ignore
    if (input.substr(peg$currPos, 6) === peg$c5) {
// @ts-ignore
      s1 = peg$c5;
// @ts-ignore
      peg$currPos += 6;
// @ts-ignore
    } else {
// @ts-ignore
      s1 = peg$FAILED;
// @ts-ignore
      if (peg$silentFails === 0) { peg$fail(peg$e5); }
    }
// @ts-ignore
    if (s1 !== peg$FAILED) {
// @ts-ignore
      peg$savedPos = s0;
// @ts-ignore
      s1 = peg$f4();
    }
// @ts-ignore
    s0 = s1;

// @ts-ignore
    return s0;
  }

// @ts-ignore
  function // @ts-ignore
peg$parserangeExpr() {
// @ts-ignore
    var s0, s1, s2, s3, s4, s5;

// @ts-ignore
    s0 = peg$currPos;
// @ts-ignore
    if (input.substr(peg$currPos, 6) === peg$c6) {
// @ts-ignore
      s1 = peg$c6;
// @ts-ignore
      peg$currPos += 6;
// @ts-ignore
    } else {
// @ts-ignore
      s1 = peg$FAILED;
// @ts-ignore
      if (peg$silentFails === 0) { peg$fail(peg$e6); }
    }
// @ts-ignore
    if (s1 !== peg$FAILED) {
// @ts-ignore
      s2 = peg$parsepositiveIntegerOrAny();
// @ts-ignore
      if (s2 !== peg$FAILED) {
// @ts-ignore
        if (input.charCodeAt(peg$currPos) === 44) {
// @ts-ignore
          s3 = peg$c7;
// @ts-ignore
          peg$currPos++;
// @ts-ignore
        } else {
// @ts-ignore
          s3 = peg$FAILED;
// @ts-ignore
          if (peg$silentFails === 0) { peg$fail(peg$e7); }
        }
// @ts-ignore
        if (s3 !== peg$FAILED) {
// @ts-ignore
          s4 = peg$parsepositiveIntegerOrAny();
// @ts-ignore
          if (s4 !== peg$FAILED) {
// @ts-ignore
            if (input.charCodeAt(peg$currPos) === 41) {
// @ts-ignore
              s5 = peg$c4;
// @ts-ignore
              peg$currPos++;
// @ts-ignore
            } else {
// @ts-ignore
              s5 = peg$FAILED;
// @ts-ignore
              if (peg$silentFails === 0) { peg$fail(peg$e4); }
            }
// @ts-ignore
            if (s5 !== peg$FAILED) {
// @ts-ignore
              peg$savedPos = s0;
// @ts-ignore
              s0 = peg$f5(s2, s4);
// @ts-ignore
            } else {
// @ts-ignore
              peg$currPos = s0;
// @ts-ignore
              s0 = peg$FAILED;
            }
// @ts-ignore
          } else {
// @ts-ignore
            peg$currPos = s0;
// @ts-ignore
            s0 = peg$FAILED;
          }
// @ts-ignore
        } else {
// @ts-ignore
          peg$currPos = s0;
// @ts-ignore
          s0 = peg$FAILED;
        }
// @ts-ignore
      } else {
// @ts-ignore
        peg$currPos = s0;
// @ts-ignore
        s0 = peg$FAILED;
      }
// @ts-ignore
    } else {
// @ts-ignore
      peg$currPos = s0;
// @ts-ignore
      s0 = peg$FAILED;
    }

// @ts-ignore
    return s0;
  }

// @ts-ignore
  function // @ts-ignore
peg$parselengthExpr() {
// @ts-ignore
    var s0, s1, s2, s3, s4;

// @ts-ignore
    s0 = peg$currPos;
// @ts-ignore
    if (input.substr(peg$currPos, 7) === peg$c8) {
// @ts-ignore
      s1 = peg$c8;
// @ts-ignore
      peg$currPos += 7;
// @ts-ignore
    } else {
// @ts-ignore
      s1 = peg$FAILED;
// @ts-ignore
      if (peg$silentFails === 0) { peg$fail(peg$e8); }
    }
// @ts-ignore
    if (s1 !== peg$FAILED) {
// @ts-ignore
      s2 = peg$currPos;
// @ts-ignore
      s3 = peg$parsepositiveIntegerOrAny();
// @ts-ignore
      if (s3 !== peg$FAILED) {
// @ts-ignore
        if (input.charCodeAt(peg$currPos) === 44) {
// @ts-ignore
          s4 = peg$c7;
// @ts-ignore
          peg$currPos++;
// @ts-ignore
        } else {
// @ts-ignore
          s4 = peg$FAILED;
// @ts-ignore
          if (peg$silentFails === 0) { peg$fail(peg$e7); }
        }
// @ts-ignore
        if (s4 !== peg$FAILED) {
// @ts-ignore
          peg$savedPos = s2;
// @ts-ignore
          s2 = peg$f6(s3);
// @ts-ignore
        } else {
// @ts-ignore
          peg$currPos = s2;
// @ts-ignore
          s2 = peg$FAILED;
        }
// @ts-ignore
      } else {
// @ts-ignore
        peg$currPos = s2;
// @ts-ignore
        s2 = peg$FAILED;
      }
// @ts-ignore
      if (s2 === peg$FAILED) {
// @ts-ignore
        s2 = null;
      }
// @ts-ignore
      s3 = peg$parsepositiveIntegerOrAny();
// @ts-ignore
      if (s3 !== peg$FAILED) {
// @ts-ignore
        if (input.charCodeAt(peg$currPos) === 41) {
// @ts-ignore
          s4 = peg$c4;
// @ts-ignore
          peg$currPos++;
// @ts-ignore
        } else {
// @ts-ignore
          s4 = peg$FAILED;
// @ts-ignore
          if (peg$silentFails === 0) { peg$fail(peg$e4); }
        }
// @ts-ignore
        if (s4 !== peg$FAILED) {
// @ts-ignore
          peg$savedPos = s0;
// @ts-ignore
          s0 = peg$f7(s2, s3);
// @ts-ignore
        } else {
// @ts-ignore
          peg$currPos = s0;
// @ts-ignore
          s0 = peg$FAILED;
        }
// @ts-ignore
      } else {
// @ts-ignore
        peg$currPos = s0;
// @ts-ignore
        s0 = peg$FAILED;
      }
// @ts-ignore
    } else {
// @ts-ignore
      peg$currPos = s0;
// @ts-ignore
      s0 = peg$FAILED;
    }

// @ts-ignore
    return s0;
  }

// @ts-ignore
  function // @ts-ignore
peg$parseregExpExpr() {
// @ts-ignore
    var s0, s1, s2, s3;

// @ts-ignore
    s0 = peg$currPos;
// @ts-ignore
    if (input.substr(peg$currPos, 6) === peg$c9) {
// @ts-ignore
      s1 = peg$c9;
// @ts-ignore
      peg$currPos += 6;
// @ts-ignore
    } else {
// @ts-ignore
      s1 = peg$FAILED;
// @ts-ignore
      if (peg$silentFails === 0) { peg$fail(peg$e9); }
    }
// @ts-ignore
    if (s1 !== peg$FAILED) {
// @ts-ignore
      s2 = peg$parsestringLiteral();
// @ts-ignore
      if (s2 !== peg$FAILED) {
// @ts-ignore
        if (input.charCodeAt(peg$currPos) === 41) {
// @ts-ignore
          s3 = peg$c4;
// @ts-ignore
          peg$currPos++;
// @ts-ignore
        } else {
// @ts-ignore
          s3 = peg$FAILED;
// @ts-ignore
          if (peg$silentFails === 0) { peg$fail(peg$e4); }
        }
// @ts-ignore
        if (s3 !== peg$FAILED) {
// @ts-ignore
          peg$savedPos = s0;
// @ts-ignore
          s0 = peg$f8(s2);
// @ts-ignore
        } else {
// @ts-ignore
          peg$currPos = s0;
// @ts-ignore
          s0 = peg$FAILED;
        }
// @ts-ignore
      } else {
// @ts-ignore
        peg$currPos = s0;
// @ts-ignore
        s0 = peg$FAILED;
      }
// @ts-ignore
    } else {
// @ts-ignore
      peg$currPos = s0;
// @ts-ignore
      s0 = peg$FAILED;
    }

// @ts-ignore
    return s0;
  }

// @ts-ignore
  function // @ts-ignore
peg$parsestringLiteral() {
// @ts-ignore
    var s0, s1, s2, s3;

// @ts-ignore
    s0 = peg$currPos;
// @ts-ignore
    if (input.charCodeAt(peg$currPos) === 34) {
// @ts-ignore
      s1 = peg$c10;
// @ts-ignore
      peg$currPos++;
// @ts-ignore
    } else {
// @ts-ignore
      s1 = peg$FAILED;
// @ts-ignore
      if (peg$silentFails === 0) { peg$fail(peg$e10); }
    }
// @ts-ignore
    if (s1 !== peg$FAILED) {
// @ts-ignore
      s2 = [];
// @ts-ignore
      if (peg$r0.test(input.charAt(peg$currPos))) {
// @ts-ignore
        s3 = input.charAt(peg$currPos);
// @ts-ignore
        peg$currPos++;
// @ts-ignore
      } else {
// @ts-ignore
        s3 = peg$FAILED;
// @ts-ignore
        if (peg$silentFails === 0) { peg$fail(peg$e11); }
      }
// @ts-ignore
      while (s3 !== peg$FAILED) {
// @ts-ignore
        s2.push(s3);
// @ts-ignore
        if (peg$r0.test(input.charAt(peg$currPos))) {
// @ts-ignore
          s3 = input.charAt(peg$currPos);
// @ts-ignore
          peg$currPos++;
// @ts-ignore
        } else {
// @ts-ignore
          s3 = peg$FAILED;
// @ts-ignore
          if (peg$silentFails === 0) { peg$fail(peg$e11); }
        }
      }
// @ts-ignore
      if (input.charCodeAt(peg$currPos) === 34) {
// @ts-ignore
        s3 = peg$c10;
// @ts-ignore
        peg$currPos++;
// @ts-ignore
      } else {
// @ts-ignore
        s3 = peg$FAILED;
// @ts-ignore
        if (peg$silentFails === 0) { peg$fail(peg$e10); }
      }
// @ts-ignore
      if (s3 !== peg$FAILED) {
// @ts-ignore
        peg$savedPos = s0;
// @ts-ignore
        s0 = peg$f9(s2);
// @ts-ignore
      } else {
// @ts-ignore
        peg$currPos = s0;
// @ts-ignore
        s0 = peg$FAILED;
      }
// @ts-ignore
    } else {
// @ts-ignore
      peg$currPos = s0;
// @ts-ignore
      s0 = peg$FAILED;
    }

// @ts-ignore
    return s0;
  }

// @ts-ignore
  function // @ts-ignore
peg$parsepositiveIntegerLiteral() {
// @ts-ignore
    var s0, s1, s2;

// @ts-ignore
    s0 = peg$currPos;
// @ts-ignore
    s1 = [];
// @ts-ignore
    if (peg$r1.test(input.charAt(peg$currPos))) {
// @ts-ignore
      s2 = input.charAt(peg$currPos);
// @ts-ignore
      peg$currPos++;
// @ts-ignore
    } else {
// @ts-ignore
      s2 = peg$FAILED;
// @ts-ignore
      if (peg$silentFails === 0) { peg$fail(peg$e12); }
    }
// @ts-ignore
    if (s2 !== peg$FAILED) {
// @ts-ignore
      while (s2 !== peg$FAILED) {
// @ts-ignore
        s1.push(s2);
// @ts-ignore
        if (peg$r1.test(input.charAt(peg$currPos))) {
// @ts-ignore
          s2 = input.charAt(peg$currPos);
// @ts-ignore
          peg$currPos++;
// @ts-ignore
        } else {
// @ts-ignore
          s2 = peg$FAILED;
// @ts-ignore
          if (peg$silentFails === 0) { peg$fail(peg$e12); }
        }
      }
// @ts-ignore
    } else {
// @ts-ignore
      s1 = peg$FAILED;
    }
// @ts-ignore
    if (s1 !== peg$FAILED) {
// @ts-ignore
      peg$savedPos = s0;
// @ts-ignore
      s1 = peg$f10(s1);
    }
// @ts-ignore
    s0 = s1;

// @ts-ignore
    return s0;
  }

// @ts-ignore
  function // @ts-ignore
peg$parsewildcardLiteral() {
// @ts-ignore
    var s0;

// @ts-ignore
    if (input.charCodeAt(peg$currPos) === 42) {
// @ts-ignore
      s0 = peg$c11;
// @ts-ignore
      peg$currPos++;
// @ts-ignore
    } else {
// @ts-ignore
      s0 = peg$FAILED;
// @ts-ignore
      if (peg$silentFails === 0) { peg$fail(peg$e13); }
    }

// @ts-ignore
    return s0;
  }

// @ts-ignore
  function // @ts-ignore
peg$parsepositiveIntegerOrAny() {
// @ts-ignore
    var s0;

// @ts-ignore
    s0 = peg$parsepositiveIntegerLiteral();
// @ts-ignore
    if (s0 === peg$FAILED) {
// @ts-ignore
      s0 = peg$parsewildcardLiteral();
    }

// @ts-ignore
    return s0;
  }

// @ts-ignore
  function // @ts-ignore
peg$parseparenthesizedExpr() {
// @ts-ignore
    var s0, s1, s2, s3;

// @ts-ignore
    s0 = peg$currPos;
// @ts-ignore
    if (input.charCodeAt(peg$currPos) === 40) {
// @ts-ignore
      s1 = peg$c12;
// @ts-ignore
      peg$currPos++;
// @ts-ignore
    } else {
// @ts-ignore
      s1 = peg$FAILED;
// @ts-ignore
      if (peg$silentFails === 0) { peg$fail(peg$e14); }
    }
// @ts-ignore
    if (s1 !== peg$FAILED) {
// @ts-ignore
      s2 = [];
// @ts-ignore
      s3 = peg$parsecolumnValidationExpr();
// @ts-ignore
      if (s3 !== peg$FAILED) {
// @ts-ignore
        while (s3 !== peg$FAILED) {
// @ts-ignore
          s2.push(s3);
// @ts-ignore
          s3 = peg$parsecolumnValidationExpr();
        }
// @ts-ignore
      } else {
// @ts-ignore
        s2 = peg$FAILED;
      }
// @ts-ignore
      if (s2 !== peg$FAILED) {
// @ts-ignore
        if (input.charCodeAt(peg$currPos) === 41) {
// @ts-ignore
          s3 = peg$c4;
// @ts-ignore
          peg$currPos++;
// @ts-ignore
        } else {
// @ts-ignore
          s3 = peg$FAILED;
// @ts-ignore
          if (peg$silentFails === 0) { peg$fail(peg$e4); }
        }
// @ts-ignore
        if (s3 !== peg$FAILED) {
// @ts-ignore
          peg$savedPos = s0;
// @ts-ignore
          s0 = peg$f11(s2);
// @ts-ignore
        } else {
// @ts-ignore
          peg$currPos = s0;
// @ts-ignore
          s0 = peg$FAILED;
        }
// @ts-ignore
      } else {
// @ts-ignore
        peg$currPos = s0;
// @ts-ignore
        s0 = peg$FAILED;
      }
// @ts-ignore
    } else {
// @ts-ignore
      peg$currPos = s0;
// @ts-ignore
      s0 = peg$FAILED;
    }

// @ts-ignore
    return s0;
  }

// @ts-ignore
  peg$result = peg$startRuleFunction();

// @ts-ignore
  if (peg$result !== peg$FAILED && peg$currPos === input.length) {
// @ts-ignore
    return peg$result;
// @ts-ignore
  } else {
// @ts-ignore
    if (peg$result !== peg$FAILED && peg$currPos < input.length) {
// @ts-ignore
      peg$fail(peg$endExpectation());
    }

// @ts-ignore
    throw peg$buildStructuredError(
// @ts-ignore
      peg$maxFailExpected,
// @ts-ignore
      peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null,
// @ts-ignore
      peg$maxFailPos < input.length
// @ts-ignore
        ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1)
// @ts-ignore
        : peg$computeLocation(peg$maxFailPos, peg$maxFailPos)
    );
  }
}

// @ts-ignore
  return {
    SyntaxError: peg$SyntaxError,
    parse: peg$parse
  };
})()

export interface FilePosition {
  offset: number;
  line: number;
  column: number;
}

export interface FileRange {
  start: FilePosition;
  end: FilePosition;
  source: string;
}

export interface LiteralExpectation {
  type: "literal";
  text: string;
  ignoreCase: boolean;
}

export interface ClassParts extends Array<string | ClassParts> {}

export interface ClassExpectation {
  type: "class";
  parts: ClassParts;
  inverted: boolean;
  ignoreCase: boolean;
}

export interface AnyExpectation {
  type: "any";
}

export interface EndExpectation {
  type: "end";
}

export interface OtherExpectation {
  type: "other";
  description: string;
}

export type Expectation = LiteralExpectation | ClassExpectation | AnyExpectation | EndExpectation | OtherExpectation;

declare class _PeggySyntaxError extends Error {
  public static buildMessage(expected: Expectation[], found: string | null): string;
  public message: string;
  public expected: Expectation[];
  public found: string | null;
  public location: FileRange;
  public name: string;
  constructor(message: string, expected: Expectation[], found: string | null, location: FileRange);
  format(sources: {
    source?: any;
    text: string;
  }[]): string;
}

export interface TraceEvent {
    type: string;
    rule: string;
    result?: any;
    location: FileRange;
  }

declare class _DefaultTracer {
  private indentLevel: number;
  public trace(event: TraceEvent): void;
}

peggyParser.SyntaxError.prototype.name = "PeggySyntaxError";

export interface ParseOptions {
  filename?: string;
  startRule?: "columnRule";
  tracer?: any;
  [key: string]: any;
}
export type ParseFunction = <Options extends ParseOptions>(
    input: string,
    options?: Options
  ) => Options extends { startRule: infer StartRule } ?
    StartRule extends "columnRule" ? ColumnRule : ColumnRule
    : ColumnRule;
export const parse: ParseFunction = peggyParser.parse;

export const PeggySyntaxError = peggyParser.SyntaxError as typeof _PeggySyntaxError;

export type PeggySyntaxError = _PeggySyntaxError;

// These types were autogenerated by ts-pegjs
export type ColumnRule = ColumnValidationExpr[];
export type ColumnValidationExpr = CombinatorialExpr | NonConditionalExpr;
export type CombinatorialExpr = OrExpr | AndExpr;
export type OrExpr = {
  type: "or";
  left: NonConditionalExpr;
  right: ColumnValidationExpr;
};
export type AndExpr = {
  type: "and";
  left: NonConditionalExpr;
  right: ColumnValidationExpr;
};
export type NonConditionalExpr = SingleExpr | ParenthesizedExpr;
export type SingleExpr =
  | NotEmptyExpr
  | IsExpr
  | UniqueExpr
  | RangeExpr
  | LengthExpr
  | RegExpExpr;
export type NotEmptyExpr = { type: "notEmpty" };
export type IsExpr = { type: "is"; value: StringLiteral };
export type UniqueExpr = { type: "unique" };
export type RangeExpr = {
  type: "range";
  min: PositiveIntegerOrAny;
  max: PositiveIntegerOrAny;
};
export type LengthExpr = {
  type: "length";
  min: PositiveIntegerOrAny | null;
  max: PositiveIntegerOrAny;
};
export type RegExpExpr = { type: "regex"; value: StringLiteral };
export type StringLiteral = string;
export type PositiveIntegerLiteral = number;
export type WildcardLiteral = "*";
export type PositiveIntegerOrAny = PositiveIntegerLiteral | WildcardLiteral;
export type ParenthesizedExpr = {
  type: "array";
  values: ColumnValidationExpr[];
};
