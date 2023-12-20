import { describe, expect, test } from "@jest/globals";
import { RangeRule } from "./range-rule";
describe("RangeRule", () => {
  describe("valid", () => {
    const rule = (option: { min: number | "*"; max: number | "*" }) =>
      new RangeRule({
        type: "range",
        min: option.min,
        max: option.max,
        text: `range(${option.min},${option.max})`,
      });

    test.each([
      [rule({ min: 0, max: 0 }), "", false],
      [rule({ min: 0, max: 0 }), "a", false],

      [rule({ min: 0, max: 0 }), "0", true],

      [rule({ min: 2, max: 3 }), "1", false],
      [rule({ min: 2, max: 3 }), "2", true],
      [rule({ min: 2, max: 3 }), "3", true],
      [rule({ min: 2, max: 3 }), "4", false],

      [rule({ min: "*", max: 2 }), "1", true],
      [rule({ min: "*", max: 2 }), "2", true],
      [rule({ min: "*", max: 2 }), "3", false],

      [rule({ min: 2, max: "*" }), "1", false],
      [rule({ min: 2, max: "*" }), "2", true],
      [rule({ min: 2, max: "*" }), "3", true],
    ])("returns %s when %s", (rule, value, expected) => {
      expect(rule.valid(value)).toBe(expected);
    });
  });
});
