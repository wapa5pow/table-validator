import { describe, expect, test } from "@jest/globals";
import { LengthRule } from "./length-rule";
describe("LengthRule", () => {
  describe("valid", () => {
    test.each([
      [new LengthRule({ type: "length", min: null, max: 0 }), "", true],
      [new LengthRule({ type: "length", min: null, max: 2 }), "ab", true],
      [new LengthRule({ type: "length", min: null, max: 2 }), "a", false],
      [new LengthRule({ type: "length", min: null, max: 2 }), "abc", false],
      [new LengthRule({ type: "length", min: null, max: "*" }), "ab", true],

      [new LengthRule({ type: "length", min: "*", max: 0 }), "", true],
      [new LengthRule({ type: "length", min: "*", max: 2 }), "ab", true],
      [new LengthRule({ type: "length", min: "*", max: 2 }), "a", true],
      [new LengthRule({ type: "length", min: "*", max: 2 }), "abc", false],
      [new LengthRule({ type: "length", min: "*", max: "*" }), "ab", true],

      [new LengthRule({ type: "length", min: 2, max: "*" }), "a", false],
      [new LengthRule({ type: "length", min: 2, max: "*" }), "ab", true],
      [new LengthRule({ type: "length", min: 2, max: "*" }), "abc", true],

      [new LengthRule({ type: "length", min: 2, max: 3 }), "a", false],
      [new LengthRule({ type: "length", min: 2, max: 3 }), "ab", true],
      [new LengthRule({ type: "length", min: 2, max: 3 }), "abc", true],
      [new LengthRule({ type: "length", min: 2, max: 3 }), "abcb", false],
    ])("returns %s when %s", (rule, value, expected) => {
      expect(rule.valid(value)).toBe(expected);
    });
  });

  describe("ruleName", () => {
    test.each([
      [new LengthRule({ type: "length", min: null, max: 0 }), "length(0)"],
      [new LengthRule({ type: "length", min: 1, max: 2 }), "length(1,2)"],
    ])("returns %s when %s", (rule, expected) => {
      expect(rule.name).toBe(expected);
    });
  });
});
