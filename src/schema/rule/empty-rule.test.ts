import { describe, expect, test } from "@jest/globals";
import { EmptyExpr } from "../parser/generated/grammar";
import { EmptyRule } from "./empty-rule";

describe("EmptyRule", () => {
  const expr: EmptyExpr = { type: "empty" };
  describe("valid", () => {
    const rule = new EmptyRule(expr);
    test.each([
      ["foo", false],
      ["", true],
    ])("returns %s when %s", (value, expected) => {
      expect(rule.valid(value)).toBe(expected);
    });
  });

  describe("ruleName", () => {
    const rule = new EmptyRule(expr);
    test("returns ruleName", () => {
      expect(rule.name).toBe("empty");
    });
  });
});
