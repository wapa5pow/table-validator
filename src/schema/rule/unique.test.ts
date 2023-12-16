import { describe, expect, test } from "@jest/globals";
import { UniqueRule } from "./unique";

describe("UniqueRule", () => {
  describe("valid", () => {
    test("should return true for a unique cell value", () => {
      const uniqueRule = new UniqueRule();
      const cellValue = "John";

      const isValid = uniqueRule.valid(cellValue);

      expect(isValid).toBe(true);
    });

    test("should return false for a non-unique cell value", () => {
      const uniqueRule = new UniqueRule();
      const cellValue = "John";

      uniqueRule.valid(cellValue); // Add the value to the set

      const isValid = uniqueRule.valid(cellValue);

      expect(isValid).toBe(false);
    });
  });
});
