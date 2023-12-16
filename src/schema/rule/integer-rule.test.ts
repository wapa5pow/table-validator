import { describe, expect, test } from "@jest/globals";
import { IntegerRule } from "./integer-rule";

describe("IntegerRule", () => {
  describe("valid", () => {
    const rule = new IntegerRule();
    test.each([
      ["0", true],
      ["123", true],
      ["-123", true],

      ["0.5", false],

      ["123a", false],
      ["a123", false],
      ["abc", false],
      ["", false],
    ])("returns %s when %s", (value, expected) => {
      expect(rule.valid(value)).toBe(expected);
    });
  });

  describe("ruleName", () => {
    const rule = new IntegerRule();
    test("returns ruleName", () => {
      expect(rule.ruleName).toBe("integer");
    });
  });
});
