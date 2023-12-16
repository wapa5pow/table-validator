import { describe, expect, test } from "@jest/globals";
import { NotRule } from "./not-rule";

describe("NotRule", () => {
  describe("valid", () => {
    const rule = new NotRule("foo");
    test.each([
      ["foo", false],
      ["bar", true],
    ])("returns %s when %s", (value, expected) => {
      expect(rule.valid(value)).toBe(expected);
    });
  });

  describe("ruleName", () => {
    const rule = new NotRule("foo");
    test("returns ruleName", () => {
      expect(rule.ruleName).toBe('not("foo")');
    });
  });
});
