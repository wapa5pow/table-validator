import { describe, expect, test } from "@jest/globals";
import { RangeRule } from "./range-rule";
describe("RangeRule", () => {
  describe("valid", () => {
    test.each([
      [new RangeRule(0, 0), "", false],
      [new RangeRule(0, 0), "a", false],

      [new RangeRule(0, 0), "0", true],

      [new RangeRule(2, 3), "1", false],
      [new RangeRule(2, 3), "2", true],
      [new RangeRule(2, 3), "3", true],
      [new RangeRule(2, 3), "4", false],

      [new RangeRule("*", 2), "1", true],
      [new RangeRule("*", 2), "2", true],
      [new RangeRule("*", 2), "3", false],

      [new RangeRule(2, "*"), "1", false],
      [new RangeRule(2, "*"), "2", true],
      [new RangeRule(2, "*"), "3", true],
    ])("returns %s when %s", (rule, value, expected) => {
      expect(rule.valid(value)).toBe(expected);
    });
  });

  describe("ruleName", () => {
    test.each([
      [new RangeRule(10, 20), "range(10,20)"],
      [new RangeRule("*", 10), "range(*,10)"],
      [new RangeRule(10, "*"), "range(10,*)"],
    ])("returns %s when %s", (rule, expected) => {
      expect(rule.ruleName).toBe(expected);
    });
  });
});
