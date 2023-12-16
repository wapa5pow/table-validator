import { describe, expect, test } from "@jest/globals";
import { RangeRule } from "./range-rule";
describe("RangeRule", () => {
  describe("valid", () => {
    test.each([
      [new RangeRule({ type: "range", min: 0, max: 0 }), "", false],
      [new RangeRule({ type: "range", min: 0, max: 0 }), "a", false],

      [new RangeRule({ type: "range", min: 0, max: 0 }), "0", true],

      [new RangeRule({ type: "range", min: 2, max: 3 }), "1", false],
      [new RangeRule({ type: "range", min: 2, max: 3 }), "2", true],
      [new RangeRule({ type: "range", min: 2, max: 3 }), "3", true],
      [new RangeRule({ type: "range", min: 2, max: 3 }), "4", false],

      [new RangeRule({ type: "range", min: "*", max: 2 }), "1", true],
      [new RangeRule({ type: "range", min: "*", max: 2 }), "2", true],
      [new RangeRule({ type: "range", min: "*", max: 2 }), "3", false],

      [new RangeRule({ type: "range", min: 2, max: "*" }), "1", false],
      [new RangeRule({ type: "range", min: 2, max: "*" }), "2", true],
      [new RangeRule({ type: "range", min: 2, max: "*" }), "3", true],
    ])("returns %s when %s", (rule, value, expected) => {
      expect(rule.valid(value)).toBe(expected);
    });
  });

  describe("ruleName", () => {
    test.each([
      [new RangeRule({ type: "range", min: 10, max: 20 }), "range(10,20)"],
      [new RangeRule({ type: "range", min: "*", max: 10 }), "range(*,10)"],
      [new RangeRule({ type: "range", min: 10, max: "*" }), "range(10,*)"],
    ])("returns %s when %s", (rule, expected) => {
      expect(rule.name).toBe(expected);
    });
  });
});
