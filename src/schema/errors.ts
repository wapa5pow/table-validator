export class ParseGrammarError extends Error {
  constructor(
    // 0-indexed column index
    readonly columnIndex: number,
    // 0-indexed offset on line
    readonly offset: number,
  ) {
    const message = `parse fails for column: ${columnIndex}, location: ${
      offset + 1
    }`;
    super(message);
  }
}
