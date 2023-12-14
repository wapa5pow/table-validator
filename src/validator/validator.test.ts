import { describe, expect, it } from "@jest/globals";
import { parse } from "../schema/parser/generated/grammar";
import { Schema } from "../schema/schema";
import { Row, Table } from "../table/table";
import { Validator } from "./validator"; // Import the Validator class

describe("Validator", () => {
  describe("validate", () => {
    describe("no rule", () => {
      it.skip("should return empty error", () => {
        const validator = new Validator(); // Declare the validator variable
        const rule = parse("");
        const error = validator.validate(
          new Table([new Row(1, [""])]),
          new Schema([rule]),
        );
        expect(error.length).toBe(0);
      });
    });
    describe("notEmpty", () => {
      it("should return error if the column is not empty", () => {
        const validator = new Validator(); // Declare the validator variable
        const notEmptyRule = parse("notEmpty");
        const error = validator.validate(
          new Table([new Row(1, ["10", ""])]),
          new Schema([notEmptyRule, notEmptyRule]),
        );
        expect(error.length).toBe(1);
        expect(error[0].ruleName).toBe("notEmpty");
        expect(error[0].lineNumber).toBe(1);
        expect(error[0].columnNumber).toBe(2);
      });
    });

    describe("unique", () => {
      it("should return error if the column is not unique", () => {
        const validator = new Validator(); // Declare the validator variable
        const uniqueRule1 = parse("unique");
        const uniqueRule2 = parse("unique");
        const error = validator.validate(
          new Table([new Row(1, ["10", "20"]), new Row(2, ["11", "20"])]),
          new Schema([uniqueRule1, uniqueRule2]),
        );
        expect(error.length).toBe(1);
        expect(error[0].ruleName).toBe("unique");
        expect(error[0].lineNumber).toBe(2);
        expect(error[0].columnNumber).toBe(2);
      });
    });
  });
});
