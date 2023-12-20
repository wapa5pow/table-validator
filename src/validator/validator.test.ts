import { describe, expect, it } from "@jest/globals";
import { Schema } from "../schema/schema";
import { convertToSchema } from "../schema/setting";
import { Row, Table, convertToTable } from "../table/table";
import { ValidationRuleError } from "./errors";
import { Validator } from "./validator";

describe("Validator", () => {
  describe("validate", () => {
    describe("complicated rules", () => {
      const yamlValue = `
columns:
  - id: id
    rule: notEmpty and unique
  - id: country
    rule: is("China") or is("Japan") or is("Russia")
  - id: capital
    rule:
  - id: population
    rule: range(0,*)
`;

      it("should be valid", () => {
        const csvValue = `
id,country,capital,population
1,China,Beijing,21542000
2,Japan,Tokyo,14094034
3,Russia,Moscow,13104177
`;

        const schema = convertToSchema(yamlValue);
        const table = convertToTable(csvValue, { header: true });
        const validator = new Validator();
        const errors = validator.validate(table, schema);
        expect(errors).toHaveLength(0);
      });

      it('should return error if the column is invalid for "unique"', () => {
        const csvValue = `
id,country,capital,population
1,China,Beijing,21542000
1,China,Beijing,21542000
`;

        const schema = convertToSchema(yamlValue);
        const table = convertToTable(csvValue, { header: true });
        const validator = new Validator();
        const errors = validator.validate(table, schema);
        expect(errors).toHaveLength(1);
        expect((errors[0] as ValidationRuleError).ruleText).toContain("unique");
      });
    });

    describe("table foramt error", () => {
      it("should return error if the table column number does not match column rule numbers", () => {
        const yamlValue = `
columns:
  - id: id
    rule: notEmpty and unique
  - id: country
    rule: is("China") or is("Japan") or is("Russia")
  - id: capital
    rule:
  - id: population
    rule: range(0,*)`;

        const csvValue = `
id,country,capital,population
1,China,Beijing,21542000
2,Japan,Tokyo
3,Russia,Moscow,13104177
`;

        const schema = convertToSchema(yamlValue);
        const table = convertToTable(csvValue, { header: true });
        const validator = new Validator();
        const errors = validator.validate(table, schema);
        expect(errors).toHaveLength(1);
        expect(errors[0].name).toContain("ColumnMissmatchError");
      });
    });

    describe("no rule", () => {
      it("should return empty error", () => {
        const validator = new Validator();
        const rule = "";
        const error = validator.validate(
          new Table([new Row(1, [""])]),
          new Schema([rule]),
        );
        expect(error).toHaveLength(0);
      });
    });

    describe("or", () => {
      it("should return error if the column is invalid", () => {
        const validator = new Validator();
        const rule = 'is("foo") or is("bar")';
        const errors = validator.validate(
          new Table([new Row(1, ["foo", "bar", "baz"])]),
          new Schema([rule, rule, rule]),
        );
        expect(errors).toHaveLength(1);
        const error = errors[0] as ValidationRuleError;
        expect(error.ruleText).toBe(rule);
        expect(error.line).toBe(1);
        expect(error.columnNumber).toBe(3);
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
        expect(errors).toHaveLength(1);
        const error = errors[0] as ValidationRuleError;
        expect(error.ruleText).toBe("range(10,20)");
        expect(error.line).toBe(1);
        expect(error.columnNumber).toBe(3);
      });

      it("should return error if the column is invalid for both and rules", () => {
        const validator = new Validator();
        const rule = "length(2) and range(10,20)";
        const errors = validator.validate(
          new Table([new Row(1, ["10", "20", "1"])]),
          new Schema([rule, rule, rule]),
        );
        expect(errors).toHaveLength(1);
        const error = errors[0] as ValidationRuleError;
        expect(error.ruleText).toBe(rule);
        expect(error.line).toBe(1);
        expect(error.columnNumber).toBe(3);
      });
    });

    describe("parentheses", () => {
      it("should return error if the column is invalid", () => {
        const validator = new Validator();
        const rule = '(is("foo") or is("bar"))';
        const errors = validator.validate(
          new Table([new Row(1, ["foo", "bar", "baz"])]),
          new Schema([rule, rule, rule]),
        );
        expect(errors).toHaveLength(1);
        const error = errors[0] as ValidationRuleError;
        expect(error.ruleText).toBe(rule);
        expect(error.line).toBe(1);
        expect(error.columnNumber).toBe(3);
      });

      it("should return error if the column is invalid with complicated rule", () => {
        const validator = new Validator();
        const rule = '(is("foo") or is("bar")) and notEmpty';
        const errors = validator.validate(
          new Table([new Row(1, ["foo", "bar", "baz"])]),
          new Schema([rule, rule, rule]),
        );
        expect(errors).toHaveLength(1);
        const error = errors[0] as ValidationRuleError;
        expect(error.ruleText).toBe('(is("foo") or is("bar"))');
        expect(error.line).toBe(1);
        expect(error.columnNumber).toBe(3);
      });
    });

    describe("is", () => {
      it("should return error if the column is invalid", () => {
        const validator = new Validator();
        const rule = 'is("foo")';
        const errors = validator.validate(
          new Table([new Row(1, ["foo", "bar"])]),
          new Schema([rule, rule]),
        );
        expect(errors).toHaveLength(1);
        const error = errors[0] as ValidationRuleError;
        expect(error.ruleText).toContain("is");
        expect(error.line).toBe(1);
        expect(error.columnNumber).toBe(2);
      });
    });

    describe("not", () => {
      it("should return error if the column is invalid", () => {
        const validator = new Validator();
        const rule = 'not("foo")';
        const errors = validator.validate(
          new Table([new Row(1, ["foo", "bar"])]),
          new Schema([rule, rule]),
        );
        expect(errors).toHaveLength(1);
        const error = errors[0] as ValidationRuleError;
        expect(error.ruleText).toBe(rule);
        expect(error.line).toBe(1);
        expect(error.columnNumber).toBe(1);
      });
    });

    describe("notEmpty", () => {
      it("should return error if the column is invalid", () => {
        const validator = new Validator();
        const rule = "notEmpty";
        const errors = validator.validate(
          new Table([new Row(1, ["10", ""])]),
          new Schema([rule, rule]),
        );
        expect(errors).toHaveLength(1);
        const error = errors[0] as ValidationRuleError;
        expect(error.ruleText).toBe(rule);
        expect(error.line).toBe(1);
        expect(error.columnNumber).toBe(2);
      });
    });

    describe("empty", () => {
      it("should return error if the column is invalid", () => {
        const validator = new Validator();
        const rule = "empty";
        const errors = validator.validate(
          new Table([new Row(1, ["10", ""])]),
          new Schema([rule, rule]),
        );
        expect(errors).toHaveLength(1);
        const error = errors[0] as ValidationRuleError;
        expect(error.ruleText).toBe(rule);
        expect(error.line).toBe(1);
        expect(error.columnNumber).toBe(1);
      });
    });

    describe("unique", () => {
      it("should return error if the column is invalid", () => {
        const validator = new Validator();
        const rule1 = "unique";
        const rule2 = "unique";
        const errors = validator.validate(
          new Table([new Row(1, ["10", "20"]), new Row(2, ["11", "20"])]),
          new Schema([rule1, rule2]),
        );
        expect(errors).toHaveLength(1);
        const error = errors[0] as ValidationRuleError;
        expect(error.ruleText).toBe(rule2);
        expect(error.line).toBe(2);
        expect(error.columnNumber).toBe(2);
      });
    });

    describe("range", () => {
      it("should return error if the column is invalid", () => {
        const validator = new Validator();
        const rule = "range(10,20)";
        const errors = validator.validate(
          new Table([new Row(1, ["10", "20", "30"])]),
          new Schema([rule, rule, rule]),
        );
        expect(errors).toHaveLength(1);
        const error = errors[0] as ValidationRuleError;
        expect(error.ruleText).toBe(rule);
        expect(error.line).toBe(1);
        expect(error.columnNumber).toBe(3);
      });
    });

    describe("length", () => {
      it("should return error if the column is invalid", () => {
        const validator = new Validator();
        const rule = "length(2,3)";
        const errors = validator.validate(
          new Table([new Row(1, ["a", "ab", "abc"])]),
          new Schema([rule, rule, rule]),
        );
        expect(errors).toHaveLength(1);
        const error = errors[0] as ValidationRuleError;
        expect(error.ruleText).toBe(rule);
        expect(error.line).toBe(1);
        expect(error.columnNumber).toBe(1);
      });
    });

    describe("regex", () => {
      it("should return error if the column is invalid", () => {
        const validator = new Validator();
        const rule = 'regex("[bcm]at")';
        const errors = validator.validate(
          new Table([new Row(1, ["bat", "cat", "rat"])]),
          new Schema([rule, rule, rule]),
        );
        expect(errors).toHaveLength(1);
        const error = errors[0] as ValidationRuleError;
        expect(error.ruleText).toBe(rule);
        expect(error.line).toBe(1);
        expect(error.columnNumber).toBe(3);
      });
    });

    describe("integer", () => {
      it("should return error if the column is invalid", () => {
        const validator = new Validator();
        const rule = "integer";
        const errors = validator.validate(
          new Table([new Row(1, ["0", "a"])]),
          new Schema([rule, rule]),
        );
        expect(errors).toHaveLength(1);
        const error = errors[0] as ValidationRuleError;
        expect(error.ruleText).toBe(rule);
        expect(error.line).toBe(1);
        expect(error.columnNumber).toBe(2);
      });
    });

    describe("float", () => {
      it("should return error if the column is invalid", () => {
        const validator = new Validator();
        const rule = "float";
        const errors = validator.validate(
          new Table([new Row(1, ["0.5", "a"])]),
          new Schema([rule, rule]),
        );
        expect(errors).toHaveLength(1);
        const error = errors[0] as ValidationRuleError;
        expect(error.ruleText).toBe(rule);
        expect(error.line).toBe(1);
        expect(error.columnNumber).toBe(2);
      });
    });

    describe("any", () => {
      it("should return error if the column is invalid", () => {
        const validator = new Validator();
        const rule1 = 'any("a")';
        const rule2 = 'any("1","2","3")';
        const errors = validator.validate(
          new Table([new Row(1, ["a", "1"]), new Row(2, ["a", "4"])]),
          new Schema([rule1, rule2]),
        );
        expect(errors).toHaveLength(1);
        const error = errors[0] as ValidationRuleError;
        expect(error.ruleText).toBe(rule2);
        expect(error.line).toBe(2);
        expect(error.columnNumber).toBe(2);
      });
    });
  });
});
