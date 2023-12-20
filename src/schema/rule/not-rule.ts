import { NotExpr } from "../parser/generated/grammar";
import { Rule } from "./rule";

export class NotRule extends Rule {
  constructor(readonly expr: NotExpr) {
    super();
  }

  valid(cellValue: string): boolean {
    return cellValue !== this.expr.value;
  }
}
