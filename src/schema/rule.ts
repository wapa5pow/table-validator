import { Result } from "../result";
import { Row } from "../table/table";
import { ValidationError } from "../validator/errors";

export abstract class Rule {
  abstract name: string;

  // 行全体に対して評価する
  evaluate(columnIndex: number, row: Row): Result<void, ValidationError> {
    if (this.valid(row.cellValues[columnIndex], columnIndex, row)) {
      return Result.success(undefined);
    }
    return Result.failure(this.fail(columnIndex, row));
  }

  // 特定のセルの値に対して評価する
  abstract valid(cellValue: string, columnIndex: number, row: Row): boolean;

  // 失敗した場合のエラー定義
  fail(columnIndex: number, row: Row): ValidationError {
    return new ValidationError(this.name, row.lineNumber, columnIndex);
  }
}

export class NotEmptyRule extends Rule {
  name = "notEmpty";

  valid(cellValue: string): boolean {
    return cellValue !== "";
  }
}

export class IsRule extends Rule {
  name = "is";

  constructor(private readonly value: string) {
    super();
  }

  valid(cellValue: string): boolean {
    return cellValue === this.value;
  }
}
