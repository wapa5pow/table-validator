import { Result } from "../../result";
import { Row } from "../../table/table";
import { ValidationError } from "../../validator/errors";

export abstract class Rule {
  protected abstract readonly baseName: string;

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
    const message = `${this.ruleName} fails for line: ${
      row.lineNumber
    }, column: ${columnIndex + 1}`;
    return new ValidationError(message);
  }

  get ruleName() {
    return this.baseName;
  }
}
