import { Result } from "../../result";
import { Row } from "../../table/table";
import { ValidationError } from "../../validator/errors";
import { SingleExpr } from "../parser/generated/grammar";

export abstract class Rule {
  protected abstract readonly expr: SingleExpr;

  evaluate(columnIndex: number, row: Row): Result<void, ValidationError> {
    if (this.valid(row.cellValues[columnIndex], columnIndex, row)) {
      return Result.success(undefined);
    }
    return Result.failure(this.fail(columnIndex, row));
  }

  protected abstract valid(
    cellValue: string,
    columnIndex: number,
    row: Row,
  ): boolean;

  protected fail(columnIndex: number, row: Row): ValidationError {
    return new ValidationError(this.name, row.lineNumber, columnIndex);
  }

  get name(): string {
    return this.expr.type;
  }
}
