import { describe, expect, test } from "@jest/globals";
import { NotExpr } from "../parser/generated/grammar";
import { NotRule } from "./not-rule";

describe("NotRule", () => {
  const expr: NotExpr = { type: "not", value: "foo" };
  describe("valid", () => {
    const rule = new NotRule(expr);
    test.each([
      ["foo", false],
      ["bar", true],
    ])("returns %s when %s", (value, expected) => {
      expect(rule.valid(value)).toBe(expected);
    });
  });

  describe("ruleName", () => {
    const rule = new NotRule(expr);
    test("returns ruleName", () => {
      expect(rule.name).toBe('not("foo")');
    });
  });
});
