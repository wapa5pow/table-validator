export class ValidationError extends Error {
  readonly columnNumber: number;

  constructor(
    readonly ruleName: string,
    // 1-indexed line number
    readonly lineNumber: number,
    // 0-indexed column number
    readonly columnIndex: number,
  ) {
    const columnNumber = columnIndex + 1;
    const message = `${ruleName} fails for line: ${lineNumber}, column: ${columnNumber}`;
    super(message);
    this.columnNumber = columnNumber;
  }
}
