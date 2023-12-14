export class ValidationError extends Error {
  constructor(
    readonly ruleName: string,
    // 1-indexed line number
    readonly lineNumber: number,
    // 1-indexed column number
    readonly columnNumber: number,
  ) {
    const message = `${ruleName} fails for line: ${lineNumber}, column: ${columnNumber}`;
    super(message);
  }
}
