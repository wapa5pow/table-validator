import { describe, expect, test } from "@jest/globals";
import { IntegerExpr } from "../parser/generated/grammar";
import { IntegerRule } from "./integer-rule";

describe("IntegerRule", () => {
  const expr: IntegerExpr = { type: "integer" };
  describe("valid", () => {
    const rule = new IntegerRule(expr);
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
    const rule = new IntegerRule(expr);
    test("returns ruleName", () => {
      expect(rule.name).toBe("integer");
    });
  });
});
