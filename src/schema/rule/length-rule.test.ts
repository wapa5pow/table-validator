import { describe, expect, test } from "@jest/globals";
import { LengthRule } from "./length-rule";
describe("LengthRule", () => {
  test.each([
    [new LengthRule(null, 0), "", true],
    [new LengthRule(null, 2), "ab", true],
    [new LengthRule(null, 2), "a", false],
    [new LengthRule(null, 2), "abc", false],
    [new LengthRule(null, "*"), "ab", true],

    [new LengthRule("*", 0), "", true],
    [new LengthRule("*", 2), "ab", true],
    [new LengthRule("*", 2), "a", true],
    [new LengthRule("*", 2), "abc", false],
    [new LengthRule("*", "*"), "ab", true],

    [new LengthRule(2, "*"), "a", false],
    [new LengthRule(2, "*"), "ab", true],
    [new LengthRule(2, "*"), "abc", true],

    [new LengthRule(2, 3), "a", false],
    [new LengthRule(2, 3), "ab", true],
    [new LengthRule(2, 3), "abc", true],
    [new LengthRule(2, 3), "abcb", false],
  ])("returns %s when %s", (rule, value, expected) => {
    expect(rule.valid(value)).toBe(expected);
  });
});
