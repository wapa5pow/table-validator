import { describe, expect, it, test } from "@jest/globals";
import { RuleParseError } from "./errors";
import { Schema } from "./schema";
describe("Schema", () => {
  describe("constructor", () => {
    describe("success", () => {
      test.each([
        ["length(5)", 1],
        ['is("a") or is("b")', 1],
        ["notEmpty and unique", 1],
        ["", 1],
      ])("returns %s when %s", (value, expected) => {
        const schema = new Schema([value]);
        expect(schema.columnRules).toHaveLength(expected);
      });
      it("should parse the rule", () => {});
    });

    it("should throw error if the rule is invalid", () => {
      try {
        new Schema(["length()"]);
      } catch (error) {
        expect(error).toBeInstanceOf(RuleParseError);
        expect(error).toStrictEqual(new RuleParseError(0, 7));
      }
    });
  });
});
