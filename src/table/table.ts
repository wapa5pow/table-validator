import * as papa from "papaparse";

// バリデーション対象のテーブル全体を表すクラス
export class Table {
  private _rows: Row[];

  constructor(rows: Row[]) {
    this._rows = rows;
  }

  get rows(): Row[] {
    return this._rows;
  }
}

export class Row {
  private _lineNumber: number;
  private _cellValues: string[];

  constructor(lineNumber: number, cellValues: string[]) {
    this._cellValues = cellValues;
    this._lineNumber = lineNumber;
  }

  get lineNumber(): number {
    return this._lineNumber;
  }

  get cellValues(): string[] {
    return this._cellValues;
  }
}

export function convertToTable(content: string) {
  const hasHeader = false;
  const csv = papa.parse<string[]>(content, { header: hasHeader });
  if (hasHeader) {
    csv.data.shift();
  }
  const data = csv.data;
  const firstLineNumber = hasHeader ? 2 : 1;
  const table = new Table(
    data.map((row, index) => new Row(firstLineNumber + index, row)),
  );
  return table;
}
