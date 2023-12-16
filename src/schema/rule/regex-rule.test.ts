import { describe, expect, test } from "@jest/globals";
import { RegExpExpr } from "../parser/generated/grammar";
import { RegexRule } from "./regex-rule";

describe("RegexRule", () => {
  describe("valid", () => {
    const expr: RegExpExpr = { type: "regex", value: "[bcm]at" };
    test.each([
      [new RegexRule(expr), "", false],

      [new RegexRule(expr), "bat", true],
      [new RegexRule(expr), "cat", true],
      [new RegexRule(expr), "mat", true],

      [new RegexRule(expr), "aat", false],
      [new RegexRule(expr), "catt", false],
      [new RegexRule(expr), "ccat", false],

      [new RegexRule({ type: "regex", value: "^abc$" }), "abc", true],
    ])("%s returns %s when %s", (rule, value, expected) => {
      expect(rule.valid(value)).toBe(expected);
    });
  });

  describe("ruleName", () => {
    const rule = new RegexRule({ type: "regex", value: "foo" });
    test("returns ruleName", () => {
      expect(rule.name).toBe('regex("foo")');
    });
  });
});
