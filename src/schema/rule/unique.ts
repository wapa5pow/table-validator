import { UniqueExpr } from "../parser/generated/grammar";
import { Rule } from "./rule";

export class UniqueRule extends Rule {
  constructor(readonly expr: UniqueExpr) {
    super();
  }

  readonly values: Set<string> = new Set();

  valid(cellValue: string): boolean {
    if (this.values.has(cellValue)) {
      return false;
    }
    this.values.add(cellValue);
    return true;
  }
}
