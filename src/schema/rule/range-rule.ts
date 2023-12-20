import { RangeExpr } from "../parser/generated/grammar";
import { Rule } from "./rule";

export class RangeRule extends Rule {
  constructor(readonly expr: RangeExpr) {
    super();
  }

  valid(cellValue: string): boolean {
    const intValue = parseInt(cellValue, 10);
    if (Number.isNaN(intValue)) {
      return false;
    }

    if (this.expr.min !== "*") {
      if (intValue < this.expr.min) {
        return false;
      }
    }

    if (this.expr.max !== "*") {
      if (this.expr.max < intValue) {
        return false;
      }
    }
    return true;
  }
}
