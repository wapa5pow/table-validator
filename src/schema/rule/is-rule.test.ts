import { describe, expect, test } from "@jest/globals";
import { IsRule } from "./is-rule";

describe("isRule", () => {
  describe("valid", () => {
    const rule = new IsRule("foo");
    test.each([
      ["foo", true],
      ["bar", false],
    ])("returns %s when %s", (value, expected) => {
      expect(rule.valid(value)).toBe(expected);
    });
  });

  describe("ruleName", () => {
    const rule = new IsRule("foo");
    test("returns is(foo)", () => {
      expect(rule.ruleName).toBe('is("foo")');
    });
  });
});
