import { describe, expect, it } from "@jest/globals";
import { RuleParseError } from "./errors";
import { Schema } from "./schema";
describe("Schema", () => {
  describe("constructor", () => {
    it("should parse the rule", () => {
      const schema = new Schema(["length(5)"]);
      expect(schema.columnRules).toHaveLength(1);
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
