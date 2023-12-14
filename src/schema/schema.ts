import { ColumnRule } from "../schema/parser/generated/grammar";

// 全体のスキーマ
export class Schema {
  constructor(readonly columnRules: ColumnRule[]) {}
}
