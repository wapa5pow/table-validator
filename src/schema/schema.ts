import { ColumnDefinition } from "./column-definition";

// 全体のスキーマ
export class Schema {
  private _columnDefinitions: ColumnDefinition[];

  constructor(columnDefinitions: ColumnDefinition[]) {
    this._columnDefinitions = columnDefinitions;
  }

  get columnDefinitions(): ColumnDefinition[] {
    return this._columnDefinitions;
  }
}
