import { Rule } from "./rule";

export class RangeRule extends Rule {
  readonly baseName = "range";

  constructor(private readonly min: string, private readonly max: string) {
    super();
  }

  valid(cellValue: string): boolean {
    if (this.min !== "*") {
      const minLength = parseInt(this.min, 10);
      if (cellValue.length < minLength) {
        return false;
      }
    }

    if (this.max !== "*") {
      const maxLength = parseInt(this.max, 10);
      if (cellValue.length > maxLength) {
        return false;
      }
    }
    return true;
  }

  get ruleName() {
    return `${this.baseName}(${this.min}, ${this.max})`;
  }
}
