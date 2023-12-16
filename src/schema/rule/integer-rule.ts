import { IntegerExpr } from "../parser/generated/grammar";
import { Rule } from "./rule";

export class IntegerRule extends Rule {
  readonly regex = /^-?\d+$/;

  constructor(readonly expr: IntegerExpr) {
    super();
  }

  valid(cellValue: string): boolean {
    return this.regex.test(cellValue);
  }
}
