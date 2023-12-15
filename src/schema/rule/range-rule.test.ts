import { describe, expect, test } from "@jest/globals";
import { RangeRule } from "./range-rule";
describe("RangeRule", () => {
  test.each([
    [new RangeRule("0", "0"), "", true],
    [new RangeRule("0", "0"), "a", false],
    [new RangeRule("2", "3"), "ab", true],
    [new RangeRule("2", "3"), "abc", true],
    [new RangeRule("2", "3"), "abcd", false],
    [new RangeRule("*", "0"), "", true],
    [new RangeRule("*", "1"), "", true],
    [new RangeRule("*", "1"), "a", true],
    [new RangeRule("*", "1"), "ab", false],
    [new RangeRule("2", "*"), "a", false],
    [new RangeRule("2", "*"), "ab", true],
    [new RangeRule("2", "*"), "abc", true],
  ])("returns %s when %s", (rule, value, expected) => {
    expect(rule.valid(value)).toBe(expected);
  });
});
