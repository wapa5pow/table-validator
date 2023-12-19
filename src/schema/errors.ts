export class RuleParseError extends Error {
  constructor(
    readonly rule: string,
    // 0-indexed column index
    readonly columnIndex: number,
    // 0-indexed offset on line
    readonly offset: number,
  ) {
    const messages: string[] = [];
    messages.push(
      `parse fails for column: ${columnIndex + 1}, location: ${offset + 1}`,
    );
    messages.push(rule);
    messages.push(`${"-".repeat(offset)}^`);
    super(messages.join("\n"));
    this.name = this.constructor.name;
  }
}

export class YamlParseError extends Error {
  constructor(readonly message: string) {
    super(`${message}`);
    this.name = this.constructor.name;
  }
}
