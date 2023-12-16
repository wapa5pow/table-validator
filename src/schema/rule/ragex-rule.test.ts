import { describe, expect, test } from "@jest/globals";
import { RegexRule } from "./ragex-rule";

describe("RegexRule", () => {
  describe("valid", () => {
    test.each([
      [new RegexRule("[bcm]at"), "", false],

      [new RegexRule("[bcm]at"), "bat", true],
      [new RegexRule("[bcm]at"), "cat", true],
      [new RegexRule("[bcm]at"), "mat", true],

      [new RegexRule("[bcm]at"), "aat", false],
      [new RegexRule("[bcm]at"), "catt", false],
      [new RegexRule("[bcm]at"), "ccat", false],
    ])("%s returns %s when %s", (rule, value, expected) => {
      expect(rule.valid(value)).toBe(expected);
    });
  });

  describe("ruleName", () => {
    const rule = new RegexRule("foo");
    test(`returns ${rule}`, () => {
      expect(rule.ruleName).toBe('regex("foo")');
    });
  });
});
