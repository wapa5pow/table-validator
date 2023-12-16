import { describe, expect, test } from "@jest/globals";
import { EmptyRule } from "./empty-rule";

describe("EmptyRule", () => {
  describe("valid", () => {
    const rule = new EmptyRule();
    test.each([
      ["foo", false],
      ["", true],
    ])("returns %s when %s", (value, expected) => {
      expect(rule.valid(value)).toBe(expected);
    });
  });

  describe("ruleName", () => {
    const rule = new EmptyRule();
    test("returns ruleName", () => {
      expect(rule.ruleName).toBe("empty");
    });
  });
});
