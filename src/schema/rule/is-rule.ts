import { Rule } from "./rule";

export class IsRule extends Rule {
  readonly baseName = "is";

  constructor(private readonly argument: string) {
    super();
  }

  valid(cellValue: string): boolean {
    return cellValue === this.argument;
  }

  get ruleName() {
    return `${this.baseName}(${this.argument})`;
  }
}
