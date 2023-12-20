import { describe, expect, test } from "@jest/globals";
import { IsRule } from "./is-rule";

describe("isRule", () => {
  describe("valid", () => {
    const rule = new IsRule({ type: "is", value: "foo", text: 'is("foo")' });
    test.each([
      ["foo", true],
      ["bar", false],
    ])("returns %s when %s", (value, expected) => {
      expect(rule.valid(value)).toBe(expected);
    });
  });
});
