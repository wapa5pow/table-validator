import { Rule } from "./rule";

export class RangeRule extends Rule {
  readonly baseName = "range";

  constructor(
    private readonly min: number | "*",
    private readonly max: number | "*",
  ) {
    super();
  }

  valid(cellValue: string): boolean {
    const intValue = parseInt(cellValue, 10);
    if (Number.isNaN(intValue)) {
      return false;
    }

    if (this.min !== "*") {
      if (intValue < this.min) {
        return false;
      }
    }

    if (this.max !== "*") {
      if (this.max < intValue) {
        return false;
      }
    }
    return true;
  }

  get ruleName() {
    return `${this.baseName}(${this.min},${this.max})`;
  }
}
