import { describe, expect, test } from "@jest/globals";
import { LengthRule } from "./length-rule";
describe("LengthRule", () => {
  const rule = (option: { min: number | "*" | null; max: number | "*" }) =>
    new LengthRule({
      type: "length",
      min: option.min,
      max: option.max,
      text: `length(${option.min},${option.max})`,
    });
  describe("valid", () => {
    test.each([
      [rule({ min: null, max: 0 }), "", true],
      [rule({ min: null, max: 2 }), "ab", true],
      [rule({ min: null, max: 2 }), "a", false],
      [rule({ min: null, max: 2 }), "abc", false],
      [rule({ min: null, max: "*" }), "ab", true],

      [rule({ min: "*", max: 0 }), "", true],
      [rule({ min: "*", max: 2 }), "ab", true],
      [rule({ min: "*", max: 2 }), "a", true],
      [rule({ min: "*", max: 2 }), "abc", false],
      [rule({ min: "*", max: "*" }), "ab", true],

      [rule({ min: 2, max: "*" }), "a", false],
      [rule({ min: 2, max: "*" }), "ab", true],
      [rule({ min: 2, max: "*" }), "abc", true],

      [rule({ min: 2, max: 3 }), "a", false],
      [rule({ min: 2, max: 3 }), "ab", true],
      [rule({ min: 2, max: 3 }), "abc", true],
      [rule({ min: 2, max: 3 }), "abcb", false],
    ])("returns %s when %s", (rule, value, expected) => {
      expect(rule.valid(value)).toBe(expected);
    });
  });
});
