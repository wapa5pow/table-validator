import { IsExpr } from "../parser/generated/grammar";
import { Rule } from "./rule";

export class IsRule extends Rule {
  constructor(readonly expr: IsExpr) {
    super();
  }

  valid(cellValue: string): boolean {
    return cellValue === this.expr.value;
  }

  get name() {
    return `${this.expr.type}("${this.expr.value}")`;
  }
}
