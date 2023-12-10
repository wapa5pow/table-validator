import { ColumnRule } from "../parser/generated/grammar";
import { IsRule, NotEmptyRule } from "../schema/rule";
import { Schema } from "../schema/schema";
import { Row, Table } from "../table/table";
import { ValidationError } from "./errors";

export class Validator {
  validate(table: Table, schema: Schema): ValidationError[] {
    return table.rows.flatMap((row) => this.validateRow(row, schema));
  }

  private validateRow(row: Row, schema: Schema): ValidationError[] {
    const errors: ValidationError[] = [];
    for (const columnIndex of row.cellValues.keys()) {
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
        const isRule = new IsRule(columnRule.value);
        const result = isRule.evaluate(columnIndex, row);
        const error = result.error;
        if (error == null) {
          return [];
        }
        return [error];
      }
      case "notEmpty": {
        const notEmptyRule = new NotEmptyRule();
        const result = notEmptyRule.evaluate(columnIndex, row);
        const error = result.error;
        if (error == null) {
          return [];
        }
        return [error];
      }
      case "array":
        // and/orが書かれていない場合はandとして扱う
        return columnRule.values.flatMap((rule) =>
          this.validateColumn(rule, columnIndex, row),
        );
      default:
        // caseに漏れがあった場合、エラーにする。
        // https://zenn.dev/qnighy/articles/462baa685c80e2
        throw new Error(
          `Unknown type: ${(columnRule as { type: "__invalid__" }).type}`,
        );
    }
  }
}
