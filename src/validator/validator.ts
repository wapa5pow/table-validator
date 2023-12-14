import { ColumnRule } from "../schema/parser/generated/grammar";
import { IsRule } from "../schema/rule/is-rule";
import { NotEmptyRule } from "../schema/rule/not-empty-rule";
import { Rule } from "../schema/rule/rule";
import { UniqueRule } from "../schema/rule/unique";
import { Schema } from "../schema/schema";
import { Row, Table } from "../table/table";
import { ValidationError } from "./errors";

export class Validator {
  // ruleMap is used to utilize the same instance of a rule for an identical columnRule.
  // For instance, uniqueRule should maintain the column value while it scans the entire column.
  private readonly ruleMap = new Map<ColumnRule, Rule>();

  validate(table: Table, chema: Schema): ValidationError[] {
    return table.rows.flatMap((row) => this.validateRow(row, chema));
  }

  private validateRow(row: Row, schema: Schema): ValidationError[] {
    const errors: ValidationError[] = [];
    for (const columnIndex of Array.from(row.cellValues.keys())) {
      const columnRule = schema.columnRules[columnIndex];
      errors.push(...this.validateColumn(columnRule, columnIndex, row));
    }
    return errors;
  }

  private validateColumn(
    columnRule: ColumnRule,
    columnIndex: number,
    row: Row,
  ): ValidationError[] {
    switch (columnRule.type) {
      case "or": {
        const leftErrors = this.validateColumn(
          columnRule.left,
          columnIndex,
          row,
        );
        if (leftErrors.length === 0) {
          return [];
        }
        return [
          ...leftErrors,
          ...this.validateColumn(columnRule.right, columnIndex, row),
        ];
      }
      case "and": {
        return [
          ...this.validateColumn(columnRule.left, columnIndex, row),
          ...this.validateColumn(columnRule.right, columnIndex, row),
        ];
      }
      case "is": {
        const rule =
          this.ruleMap.get(columnRule) ?? new IsRule(columnRule.value);
        this.ruleMap.set(columnRule, rule);
        const result = rule.evaluate(columnIndex, row);
        return result.error == null ? [] : [result.error];
      }
      case "notEmpty": {
        const rule = this.ruleMap.get(columnRule) ?? new NotEmptyRule();
        this.ruleMap.set(columnRule, rule);
        const result = rule.evaluate(columnIndex, row);
        return result.error == null ? [] : [result.error];
      }
      case "array":
        // If 'and/or' is not written, treat it as 'and'.
        return columnRule.values.flatMap((rule) =>
          this.validateColumn(rule, columnIndex, row),
        );
      case "unique": {
        const rule = this.ruleMap.get(columnRule) ?? new UniqueRule();
        this.ruleMap.set(columnRule, rule);
        const result = rule.evaluate(columnIndex, row);
        return result.error == null ? [] : [result.error];
      }
      default:
        // missing case results in error.
        // https://zenn.dev/qnighy/articles/462baa685c80e2
        throw new Error(
          `Unknown type: ${(columnRule as { type: "__invalid__" }).type}`,
        );
    }
  }
}
