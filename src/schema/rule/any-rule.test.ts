import { describe, expect, test } from "@jest/globals";
import { AnyRule } from "./any-rule";

describe("AnyRule", () => {
  describe("valid", () => {
    const rule: AnyRule = new AnyRule({
      type: "any",
      left: "foo",
      right: [] as string[],
      text: 'any("foo")',
    });
    test.each([
      ["foo", true],
      ["bar", false],
    ])("returns %s when %s", (value, expected) => {
      expect(rule.valid(value)).toBe(expected);
    });
  });

  describe("ruleName", () => {
    const rule = new AnyRule({
      type: "any",
      left: "foo",
      right: [] as string[],
      text: 'any("foo")',
    });
    test("returns ruleName", () => {
      expect(rule.text).toBe('any("foo")');
    });
  });
});
