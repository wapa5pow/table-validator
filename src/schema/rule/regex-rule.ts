import { Rule } from "./rule";

export class RegexRule extends Rule {
  readonly baseName = "regex";
  private readonly regex: RegExp;

  constructor(private readonly argument: string) {
    super();
    let regexString = argument;
    if (!argument.startsWith("^")) {
      regexString = `^${regexString}`;
    }
    if (!argument.endsWith("$")) {
      regexString = `${regexString}$`;
    }
    this.regex = new RegExp(regexString);
  }

  valid(cellValue: string): boolean {
    return this.regex.test(cellValue);
  }

  get ruleName() {
    return `${this.baseName}("${this.argument}")`;
  }
}
