import { RegExpExpr } from "../parser/generated/grammar";
import { Rule } from "./rule";

export class RegexRule extends Rule {
  private readonly regex: RegExp;

  constructor(readonly expr: RegExpExpr) {
    super();
    let regexString = this.expr.value;
    if (!regexString.startsWith("^")) {
      regexString = `^${regexString}`;
    }
    if (!regexString.endsWith("$")) {
      regexString = `${regexString}$`;
    }
    this.regex = new RegExp(regexString);
  }

  valid(cellValue: string): boolean {
    return this.regex.test(cellValue);
  }

  get name() {
    return `${this.expr.type}("${this.expr.value}")`;
  }
}
