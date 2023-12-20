export class ValidationError extends Error {}

export class ColumnMissmatchError extends ValidationError {
  constructor(
    // 1-indexed line number
    readonly line: number,
  ) {
    const message = `the number of columns does not match the number of column rules: line: ${line}`;
    super(message);
    this.name = this.constructor.name;
  }
}

export class ValidationRuleError extends ValidationError {
  readonly columnNumber: number;

  constructor(
    readonly ruleText: string,
    readonly value: string,
    // 1-indexed line number
    readonly line: number,
    // 0-indexed column index
    readonly columnIndex: number,
  ) {
    const columnNumber = columnIndex + 1;
    const message = `${ruleText} rule fails for value: "${value}", line: ${line}, column: ${columnNumber}`;
    super(message);
    this.name = this.constructor.name;
    this.columnNumber = columnNumber;
  }
}
