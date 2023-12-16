import { ColumnValidationExpr } from "../schema/parser/generated/grammar";
import { IsRule } from "../schema/rule/is-rule";
import { LengthRule } from "../schema/rule/length-rule";
import { NotEmptyRule } from "../schema/rule/not-empty-rule";
import { RangeRule } from "../schema/rule/range-rule";
import { RegexRule } from "../schema/rule/regex-rule";
import { Rule } from "../schema/rule/rule";
import { UniqueRule } from "../schema/rule/unique";
import { Schema } from "../schema/schema";
import { Row, Table } from "../table/table";
import { ValidationError } from "./errors";

export class Validator {
  // ruleMap is used to utilize the same instance of a rule for an identical columnRule.
  // For instance, uniqueRule should maintain the column value while it scans the entire column.
  private readonly ruleMap = new Map<ColumnValidationExpr, Rule>();

  validate(table: Table, schema: Schema): ValidationError[] {
    return table.rows.flatMap((row) => this.validateRow(row, schema));
  }

  private validateRow(row: Row, schema: Schema): ValidationError[] {
    const errors: ValidationError[] = [];
    for (const columnIndex of Array.from(row.cellValues.keys())) {
      const columnRule = schema.columnRules[columnIndex];
      for (const expr of columnRule as ColumnValidationExpr[]) {
        errors.push(...this.validateColumn(expr, columnIndex, row));
      }
    }
    return errors;
  }

  private validateColumn(
    expr: ColumnValidationExpr,
    columnIndex: number,
    row: Row,
  ): ValidationError[] {
    switch (expr.type) {
      case "or": {
        const leftErrors = this.validateColumn(expr.left, columnIndex, row);
        if (leftErrors.length === 0) {
          return [];
        }
        const rightErrors = this.validateColumn(expr.right, columnIndex, row);
        if (rightErrors.length === 0) {
          return [];
        }
        return [...leftErrors, ...rightErrors];
      }
      case "and": {
        return [
          ...this.validateColumn(expr.left, columnIndex, row),
          ...this.validateColumn(expr.right, columnIndex, row),
        ];
      }
      case "array":
        // If 'and/or' is not written, treat it as 'and'.
        return expr.values.flatMap((rule) =>
          this.validateColumn(rule, columnIndex, row),
        );
      case "is":
        return this.evaluate(expr, columnIndex, row, new IsRule(expr.value));
      case "notEmpty":
        return this.evaluate(expr, columnIndex, row, new NotEmptyRule());
      case "unique":
        return this.evaluate(expr, columnIndex, row, new UniqueRule());
      case "range":
        return this.evaluate(
          expr,
          columnIndex,
          row,
          new RangeRule(expr.min, expr.max),
        );
      case "length":
        return this.evaluate(
          expr,
          columnIndex,
          row,
          new LengthRule(expr.min, expr.max),
        );
      case "regex":
        return this.evaluate(expr, columnIndex, row, new RegexRule(expr.value));
      default:
        // missing case results in error.
        // https://zenn.dev/qnighy/articles/462baa685c80e2
        throw new Error(
          `Unknown type: ${(expr as { type: "__invalid__" }).type}`,
        );
    }
  }

  private evaluate(
    expr: ColumnValidationExpr,
    columnIndex: number,
    row: Row,
    rule: Rule,
  ): ValidationError[] {
    const updateRule = this.ruleMap.get(expr) ?? rule;
    this.ruleMap.set(expr, updateRule);
    const result = updateRule.evaluate(columnIndex, row);
    return result.error == null ? [] : [result.error];
  }
}
