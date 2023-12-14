import { Rule } from "./rule";

export class UniqueRule extends Rule {
  readonly baseName = "unique";

  readonly values: Set<string> = new Set();

  valid(cellValue: string): boolean {
    if (this.values.has(cellValue)) {
      return false;
    }
    this.values.add(cellValue);
    return true;
  }
}
