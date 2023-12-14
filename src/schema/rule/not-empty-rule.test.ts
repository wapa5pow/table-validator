import { describe, expect, test } from "@jest/globals";
import { NotEmptyRule } from "./not-empty-rule";

describe("NotEmptyRule", () => {
  describe("valid", () => {
    const rule = new NotEmptyRule();
    test.each([
      ["foo", true],
      ["", false],
    ])("returns %s when %s", (value, expected) => {
      expect(rule.valid(value)).toBe(expected);
    });
  });

  describe("ruleName", () => {
    const rule = new NotEmptyRule();
    test("returns notEmpty", () => {
      expect(rule.ruleName).toBe("notEmpty");
    });
  });
});
