import * as yaml from "yaml";

export class RuleParseError extends Error {
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

export class YamlParseError extends Error {
  constructor(
    readonly code: yaml.ErrorCode,
    // 1-indexed line number
    readonly line: number | undefined,
    // 1-indexed column number
    readonly column: number | undefined,
    readonly message: string,
  ) {
    super(message);
  }
}

export type YamlFieldErrorCode = "MISSING_FIELD" | "INVALID_FIELD_TYPE";

export class YamlFieldError extends Error {
  constructor(
    readonly code: YamlFieldErrorCode,
    readonly field: string,
    readonly message: string,
  ) {
    super();
  }
}
