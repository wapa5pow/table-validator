import { describe, expect, test } from "@jest/globals";
import { UniqueExpr } from "../parser/generated/grammar";
import { UniqueRule } from "./unique";

describe("UniqueRule", () => {
  const expr: UniqueExpr = { type: "unique", text: "unique" };
  describe("valid", () => {
    test("should return true for a unique cell value", () => {
      const uniqueRule = new UniqueRule(expr);
      const cellValue = "John";

      const isValid = uniqueRule.valid(cellValue);

      expect(isValid).toBe(true);
    });

    test("should return false for a non-unique cell value", () => {
      const uniqueRule = new UniqueRule(expr);
      const cellValue = "John";

      uniqueRule.valid(cellValue); // Add the value to the set

      const isValid = uniqueRule.valid(cellValue);

      expect(isValid).toBe(false);
    });
  });
});
