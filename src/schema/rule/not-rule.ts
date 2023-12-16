import { Rule } from "./rule";

export class NotRule extends Rule {
  readonly baseName = "not";

  constructor(private readonly argument: string) {
    super();
  }

  valid(cellValue: string): boolean {
    return cellValue !== this.argument;
  }

  get ruleName() {
    return `${this.baseName}("${this.argument}")`;
  }
}
