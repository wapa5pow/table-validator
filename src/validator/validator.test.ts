import { describe, expect, it } from "@jest/globals";
import { parse } from "../schema/parser/generated/grammar";
import { Schema } from "../schema/schema";
import { Row, Table } from "../table/table";
import { Validator } from "./validator";

describe("Validator", () => {
  describe("validate", () => {
    describe("no rule", () => {
      it("should return empty error", () => {
        const validator = new Validator();
        const rule = parse("");
        const error = validator.validate(
          new Table([new Row(1, [""])]),
          new Schema([rule]),
        );
        expect(error.length).toBe(0);
      });
    });

    describe("or", () => {
      it("should return error if the column is invalid", () => {
        const validator = new Validator();
        const rule = parse('is("foo") or is("bar")');
        const error = validator.validate(
          new Table([new Row(1, ["foo", "bar", "baz"])]),
          new Schema([rule, rule, rule]),
        );
        expect(error.length).toBe(2);
        expect(error[0].ruleName).toContain("is");
        expect(error[0].lineNumber).toBe(1);
        expect(error[0].columnNumber).toBe(3);
      });
    });

    describe("is", () => {
      it("should return error if the column is invalid", () => {
        const validator = new Validator();
        const isRule = parse('is("foo")');
        const error = validator.validate(
          new Table([new Row(1, ["foo", "bar"])]),
          new Schema([isRule, isRule]),
        );
        expect(error.length).toBe(1);
        expect(error[0].ruleName).toContain("is");
        expect(error[0].lineNumber).toBe(1);
        expect(error[0].columnNumber).toBe(2);
      });
    });

    describe("notEmpty", () => {
      it("should return error if the column is invalid", () => {
        const validator = new Validator();
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
      it("should return error if the column is invalid", () => {
        const validator = new Validator();
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

    describe("range", () => {
      it("should return error if the column is invalid", () => {
        const validator = new Validator();
        const rule = parse("range(10,20)");
        const error = validator.validate(
          new Table([new Row(1, ["10", "20", "30"])]),
          new Schema([rule, rule, rule]),
        );
        expect(error.length).toBe(1);
        expect(error[0].ruleName).toContain("range");
        expect(error[0].lineNumber).toBe(1);
        expect(error[0].columnNumber).toBe(3);
      });
    });

    describe("length", () => {
      it("should return error if the column is invalid", () => {
        const validator = new Validator();
        const rule = parse("length(2,3)");
        const error = validator.validate(
          new Table([new Row(1, ["a", "ab", "abc"])]),
          new Schema([rule, rule, rule]),
        );
        expect(error.length).toBe(1);
        expect(error[0].ruleName).toContain("length");
        expect(error[0].lineNumber).toBe(1);
        expect(error[0].columnNumber).toBe(1);
      });
    });

    describe("regex", () => {
      it("should return error if the column is invalid", () => {
        const validator = new Validator();
        const rule = parse('regex("[bcm]at")');
        const error = validator.validate(
          new Table([new Row(1, ["bat", "cat", "rat"])]),
          new Schema([rule, rule, rule]),
        );
        expect(error.length).toBe(1);
        expect(error[0].ruleName).toContain("regex");
        expect(error[0].lineNumber).toBe(1);
        expect(error[0].columnNumber).toBe(3);
      });
    });
  });
});
