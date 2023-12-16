import { ColumnRule, parse } from "./parser/generated/grammar";

export class Schema {
  readonly columnRules: ColumnRule[];

  constructor(readonly rawRules: string[]) {
    this.columnRules = rawRules.map((v) => parse(v));
  }
}
