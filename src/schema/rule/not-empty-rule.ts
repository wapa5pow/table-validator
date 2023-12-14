import { Rule } from "./rule";

export class NotEmptyRule extends Rule {
  baseName = "notEmpty";
  argument = undefined;

  valid(cellValue: string): boolean {
    return cellValue !== "";
  }
}
