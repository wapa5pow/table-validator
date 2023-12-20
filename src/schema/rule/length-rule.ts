import { LengthExpr } from "../parser/generated/grammar";
import { Rule } from "./rule";

export class LengthRule extends Rule {
  constructor(readonly expr: LengthExpr) {
    super();
  }

  valid(cellValue: string): boolean {
    if (this.expr.min == null && this.expr.max === "*") {
      return true;
    }
    if (this.expr.min === null) {
      return cellValue.length === this.expr.max;
    }

    if (this.expr.min !== "*") {
      if (cellValue.length < this.expr.min) {
        return false;
      }
    }

    if (this.expr.max !== "*") {
      if (this.expr.max < cellValue.length) {
        return false;
      }
    }
    return true;
  }
}
