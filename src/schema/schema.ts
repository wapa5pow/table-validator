import { ColumnRule } from "./parser/generated/grammar";

export class Schema {
  constructor(readonly columnRules: ColumnRule[]) {}
}
