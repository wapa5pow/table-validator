import { Rule } from "./rule";

export class FloatRule extends Rule {
  readonly baseName = "float";
  readonly regex = /^-?(\d*\.)?\d+$/;

  valid(cellValue: string): boolean {
    return this.regex.test(cellValue);
  }
}
