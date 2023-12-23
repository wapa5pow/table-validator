import { describe, expect, test } from "@jest/globals";
import { RegExpExpr } from "../parser/generated/grammar";
import { RegexRule } from "./regex-rule";

describe("RegexRule", () => {
  describe("valid", () => {
    describe("[bcm]at", () => {
      const expr: RegExpExpr = {
        type: "regex",
        value: "[bcm]at",
        text: 'regex("[bcm]at")',
      };
      test.each([
        [new RegexRule(expr), "", false],

        [new RegexRule(expr), "bat", true],
        [new RegexRule(expr), "cat", true],
        [new RegexRule(expr), "mat", true],

        [new RegexRule(expr), "aat", false],
        [new RegexRule(expr), "catt", false],
        [new RegexRule(expr), "ccat", false],

        [
          new RegexRule({
            type: "regex",
            value: "^abc$",
            text: 'regex("^abc$")',
          }),
          "abc",
          true,
        ],
      ])("%s returns %s when %s", (rule, value, expected) => {
        expect(rule.valid(value)).toBe(expected);
      });
    });

    describe("\\d+", () => {
      const expr: RegExpExpr = {
        type: "regex",
        value: "\\d+",
        text: 'regex("[bcm]at")',
      };
      test.each([
        [new RegexRule(expr), "123", true],
        [new RegexRule(expr), "123a", false],
      ])("%s returns %s when %s", (rule, value, expected) => {
        expect(rule.valid(value)).toBe(expected);
      });
    });
  });
});
