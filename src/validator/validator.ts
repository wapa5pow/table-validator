import { ColumnValidationExpr } from "../schema/parser/generated/grammar";
import { EmptyRule } from "../schema/rule/empty-rule";
import { FloatRule } from "../schema/rule/float-rule";
import { IntegerRule } from "../schema/rule/integer-rule";
import { IsRule } from "../schema/rule/is-rule";
import { LengthRule } from "../schema/rule/length-rule";
import { NotEmptyRule } from "../schema/rule/not-empty-rule";
import { NotRule } from "../schema/rule/not-rule";
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
      for (const expr of columnRule) {
        const error = this.validateColumn(expr, columnIndex, row);
        if (error !== undefined) {
          errors.push(error);
        }
      }
    }
    return errors;
  }

  private validateColumn(
    expr: ColumnValidationExpr,
    columnIndex: number,
    row: Row,
  ): ValidationError | undefined {
    switch (expr.type) {
      case "or": {
        const leftError = this.validateColumn(expr.left, columnIndex, row);
        if (leftError === undefined) {
          return undefined;
        }
        const rightError = this.validateColumn(expr.right, columnIndex, row);
        if (rightError === undefined) {
          return undefined;
        }
        const errorRuleName = [leftError, rightError]
          .map((e) => e.name)
          .join(" or ");
        return new ValidationError(
          `${errorRuleName}`,
          row.cellValues[columnIndex],
          row.lineNumber,
          columnIndex,
        );
      }
      case "and": {
        const leftError = this.validateColumn(expr.left, columnIndex, row);
        const rightError = this.validateColumn(expr.right, columnIndex, row);
        if (leftError === undefined && rightError === undefined) {
          return undefined;
        }
        const errorRuleName = [leftError, rightError]
          .filter((v): v is NonNullable<typeof v> => v !== undefined)
          .map((e) => e.name)
          .join(" and ");
        return new ValidationError(
          `${errorRuleName}`,
          row.cellValues[columnIndex],
          row.lineNumber,
          columnIndex,
        );
      }
      case "parentheses": {
        // If 'and/or' is not written, treat it as 'and'.
        const errors = expr.values
          .map((rule) => this.validateColumn(rule, columnIndex, row))
          .filter((v): v is NonNullable<typeof v> => v !== undefined);
        if (errors.length === 0) {
          return undefined;
        }
        const errorRuleName = errors.map((e) => e.name).join(" ");
        return new ValidationError(
          `(${errorRuleName})`,
          row.cellValues[columnIndex],
          row.lineNumber,
          columnIndex,
        );
      }
      case "is":
        return this.evaluate(expr, columnIndex, row, new IsRule(expr));
      case "not":
        return this.evaluate(expr, columnIndex, row, new NotRule(expr));
      case "notEmpty":
        return this.evaluate(expr, columnIndex, row, new NotEmptyRule(expr));
      case "empty":
        return this.evaluate(expr, columnIndex, row, new EmptyRule(expr));
      case "unique":
        return this.evaluate(expr, columnIndex, row, new UniqueRule(expr));
      case "range":
        return this.evaluate(expr, columnIndex, row, new RangeRule(expr));
      case "length":
        return this.evaluate(expr, columnIndex, row, new LengthRule(expr));
      case "regex":
        return this.evaluate(expr, columnIndex, row, new RegexRule(expr));
      case "integer":
        return this.evaluate(expr, columnIndex, row, new IntegerRule(expr));
      case "float":
        return this.evaluate(expr, columnIndex, row, new FloatRule(expr));
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
  ): ValidationError | undefined {
    const updateRule = this.ruleMap.get(expr) ?? rule;
    this.ruleMap.set(expr, updateRule);
    const result = updateRule.evaluate(columnIndex, row);
    return result.error;
  }
}
