import { describe, expect, test } from "@jest/globals";
import { FloatExpr } from "../parser/generated/grammar";
import { FloatRule } from "./float-rule";

describe("FloatRule", () => {
  const expr: FloatExpr = { type: "float" };

  describe("valid", () => {
    const rule = new FloatRule(expr);
    test.each([
      ["0", true],
      ["123", true],
      ["123.5", true],
      ["0.5", true],
      ["-0.5", true],
      ["-5", true],

      ["123a", false],
      ["a123", false],
      ["a123.5", false],
      ["abc", false],
      ["", false],
    ])("returns %s when %s", (value, expected) => {
      expect(rule.valid(value)).toBe(expected);
    });
  });

  describe("ruleName", () => {
    const rule = new FloatRule(expr);
    test("returns ruleName", () => {
      expect(rule.name).toBe("float");
    });
  });
});
