import { Rule } from "./rule";

// 列のルール
export class ColumnDefinition {
  private _rules: Rule[];

  constructor(rules: Rule[]) {
    this._rules = rules;
  }

  get rules(): Rule[] {
    return this._rules;
  }
}
