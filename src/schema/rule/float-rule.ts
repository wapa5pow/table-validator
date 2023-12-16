import { FloatExpr } from "../parser/generated/grammar";
import { Rule } from "./rule";

export class FloatRule extends Rule {
  readonly regex = /^-?(\d*\.)?\d+$/;

  constructor(readonly expr: FloatExpr) {
    super();
  }

  valid(cellValue: string): boolean {
    return this.regex.test(cellValue);
  }
}
