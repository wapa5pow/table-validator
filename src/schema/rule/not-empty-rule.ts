import { NotEmptyExpr } from "../parser/generated/grammar";
import { Rule } from "./rule";

export class NotEmptyRule extends Rule {
  constructor(readonly expr: NotEmptyExpr) {
    super();
  }

  valid(cellValue: string): boolean {
    return cellValue !== "";
  }
}
