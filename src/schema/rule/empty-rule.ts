import { Rule } from "./rule";

export class EmptyRule extends Rule {
  baseName = "empty";

  valid(cellValue: string): boolean {
    return cellValue === "";
  }
}
