import { EmptyExpr } from "../parser/generated/grammar";
import { Rule } from "./rule";

export class EmptyRule extends Rule {
  constructor(readonly expr: EmptyExpr) {
    super();
  }

  valid(cellValue: string): boolean {
    return cellValue === "";
  }
}
