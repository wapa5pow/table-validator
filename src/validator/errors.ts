export class ValidationError extends Error {
  readonly columnNumber: number;

  constructor(
    readonly name: string,
    // 1-indexed line number
    readonly line: number,
    // 0-indexed column index
    readonly columnIndex: number,
  ) {
    const columnNumber = columnIndex + 1;
    const message = `${name} fails for line: ${line}, column: ${columnNumber}`;
    super(message);
    this.columnNumber = columnNumber;
  }
}
