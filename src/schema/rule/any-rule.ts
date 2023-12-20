import { AnyExpr } from "../parser/generated/grammar";
import { Rule } from "./rule";

export class AnyRule extends Rule {
  constructor(readonly expr: AnyExpr) {
    super();
  }

  valid(cellValue: string): boolean {
    const values = [this.expr.left].concat(this.expr.right);
    return values.includes(cellValue);
  }
}
