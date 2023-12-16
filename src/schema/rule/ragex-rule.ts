import { Rule } from "./rule";

export class RegexRule extends Rule {
  readonly baseName = "regex";
  private readonly regex: RegExp;

  constructor(private readonly argument: string) {
    super();
    this.regex = new RegExp(`^${argument}$`);
  }

  valid(cellValue: string): boolean {
    return this.regex.test(cellValue);
  }

  get ruleName() {
    return `${this.baseName}("${this.argument}")`;
  }
}
