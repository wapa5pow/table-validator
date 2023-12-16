import { Rule } from "./rule";

export class IntegerRule extends Rule {
  readonly baseName = "integer";
  readonly regex = /^-?\d+$/;

  valid(cellValue: string): boolean {
    return this.regex.test(cellValue);
  }
}
