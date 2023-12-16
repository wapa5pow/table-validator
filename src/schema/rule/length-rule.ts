import { Rule } from "./rule";

export class LengthRule extends Rule {
  readonly baseName = "length";

  constructor(
    private readonly min: number | "*" | null,
    private readonly max: number | "*",
  ) {
    super();
  }

  valid(cellValue: string): boolean {
    if (this.min == null && this.max === "*") {
      return true;
    }
    if (this.min === null) {
      return cellValue.length === this.max;
    }

    if (this.min !== "*") {
      if (cellValue.length < this.min) {
        return false;
      }
    }

    if (this.max !== "*") {
      if (this.max < cellValue.length) {
        return false;
      }
    }
    return true;
  }

  get ruleName() {
    if (this.min == null) {
      return `${this.baseName}(${this.max})`;
    }
    return `${this.baseName}(${this.min},${this.max})`;
  }
}
