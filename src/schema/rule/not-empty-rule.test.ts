import { describe, expect, test } from "@jest/globals";
import { NotEmptyExpr } from "../parser/generated/grammar";
import { NotEmptyRule } from "./not-empty-rule";

describe("NotEmptyRule", () => {
  const expr: NotEmptyExpr = { type: "notEmpty", text: "notEmpty" };
  describe("valid", () => {
    const rule = new NotEmptyRule(expr);
    test.each([
      ["foo", true],
      ["", false],
    ])("returns %s when %s", (value, expected) => {
      expect(rule.valid(value)).toBe(expected);
    });
  });
});
