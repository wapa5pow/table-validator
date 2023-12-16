import { describe, expect, it } from "@jest/globals";
import { Schema } from "../schema/schema";
import { Row, Table } from "../table/table";
import { Validator } from "./validator";

describe("Validator", () => {
  describe("validate", () => {
    describe("no rule", () => {
      it("should return empty error", () => {
        const validator = new Validator();
        const rule = "";
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
        const rule = 'is("foo") or is("bar")';
        const error = validator.validate(
          new Table([new Row(1, ["foo", "bar", "baz"])]),
          new Schema([rule, rule, rule]),
        );
        expect(error.length).toBe(1);
        expect(error[0].ruleName).toBe(rule);
        expect(error[0].lineNumber).toBe(1);
        expect(error[0].columnNumber).toBe(3);
      });
    });

    describe("and", () => {
      it("should return error if the column is invalid", () => {
        const validator = new Validator();
        const rule = "length(2) and range(10,20)";
        const errors = validator.validate(
          new Table([new Row(1, ["10", "20", "21"])]),
          new Schema([rule, rule, rule]),
        );
        expect(errors.length).toBe(1);
        expect(errors[0].ruleName).toBe("range(10,20)");
        expect(errors[0].lineNumber).toBe(1);
        expect(errors[0].columnNumber).toBe(3);
      });

      it("should return error if the column is invalid for both and rules", () => {
        const validator = new Validator();
        const rule = "length(2) and range(10,20)";
        const errors = validator.validate(
          new Table([new Row(1, ["10", "20", "1"])]),
          new Schema([rule, rule, rule]),
        );
        expect(errors.length).toBe(1);
        expect(errors[0].ruleName).toBe(rule);
        expect(errors[0].lineNumber).toBe(1);
        expect(errors[0].columnNumber).toBe(3);
      });
    });

    describe("parentheses", () => {
      it("should return error if the column is invalid", () => {
        const validator = new Validator();
        const rule = '(is("foo") or is("bar"))';
        const error = validator.validate(
          new Table([new Row(1, ["foo", "bar", "baz"])]),
          new Schema([rule, rule, rule]),
        );
        expect(error.length).toBe(1);
        expect(error[0].ruleName).toBe(rule);
        expect(error[0].lineNumber).toBe(1);
        expect(error[0].columnNumber).toBe(3);
      });

      it("should return error if the column is invalid with complicated rule", () => {
        const validator = new Validator();
        const rule = '(is("foo") or is("bar")) and notEmpty';
        const error = validator.validate(
          new Table([new Row(1, ["foo", "bar", "baz"])]),
          new Schema([rule, rule, rule]),
        );
        expect(error.length).toBe(1);
        expect(error[0].ruleName).toBe('(is("foo") or is("bar"))');
        expect(error[0].lineNumber).toBe(1);
        expect(error[0].columnNumber).toBe(3);
      });
    });

    describe("is", () => {
      it("should return error if the column is invalid", () => {
        const validator = new Validator();
        const rule = 'is("foo")';
        const error = validator.validate(
          new Table([new Row(1, ["foo", "bar"])]),
          new Schema([rule, rule]),
        );
        expect(error.length).toBe(1);
        expect(error[0].ruleName).toContain("is");
        expect(error[0].lineNumber).toBe(1);
        expect(error[0].columnNumber).toBe(2);
      });
    });

    describe("not", () => {
      it("should return error if the column is invalid", () => {
        const validator = new Validator();
        const rule = 'not("foo")';
        const error = validator.validate(
          new Table([new Row(1, ["foo", "bar"])]),
          new Schema([rule, rule]),
        );
        expect(error.length).toBe(1);
        expect(error[0].ruleName).toContain("not");
        expect(error[0].lineNumber).toBe(1);
        expect(error[0].columnNumber).toBe(1);
      });
    });

    describe("notEmpty", () => {
      it("should return error if the column is invalid", () => {
        const validator = new Validator();
        const rule = "notEmpty";
        const error = validator.validate(
          new Table([new Row(1, ["10", ""])]),
          new Schema([rule, rule]),
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
        const rule1 = "unique";
        const rule2 = "unique";
        const error = validator.validate(
          new Table([new Row(1, ["10", "20"]), new Row(2, ["11", "20"])]),
          new Schema([rule1, rule2]),
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
        const rule = "range(10,20)";
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
        const rule = "length(2,3)";
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
        const rule = 'regex("[bcm]at")';
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
