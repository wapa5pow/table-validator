export class ValidationError extends Error {}

export class ColumnMissmatchError extends ValidationError {
  constructor(
    // 1-indexed line number
    readonly line: number,
  ) {
    const message = `ColumnMissmatchError: mismatch for value: line: ${line}`;
    super(message);
  }
}

export class ValidationRuleError extends ValidationError {
  readonly columnNumber: number;

  constructor(
    readonly name: string,
    readonly value: string,
    // 1-indexed line number
    readonly line: number,
    // 0-indexed column index
    readonly columnIndex: number,
  ) {
    const columnNumber = columnIndex + 1;
    const message = `ValidationRuleError: ${name} fails for value: "${value}", line: ${line}, column: ${columnNumber}`;
    super(message);
    this.columnNumber = columnNumber;
  }
}
