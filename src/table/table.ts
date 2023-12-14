import * as papa from "papaparse";

// バリデーション対象のテーブル全体を表すクラス
export class Table {
  constructor(readonly rows: Row[]) {}
}

export class Row {
  constructor(readonly lineNumber: number, readonly cellValues: string[]) {}
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
