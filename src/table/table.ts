import * as papa from "papaparse";

export class Table {
  constructor(readonly rows: Row[]) {}
}

export class Row {
  constructor(readonly lineNumber: number, readonly cellValues: string[]) {}
}

/**
 * Convert csv in string to Table
 *
 * @param content csv in string
 * @param hasHeader true if csv has header
 * @returns
 */
export function convertToTable(content: string, hasHeader: boolean): Table {
  const csv = papa.parse<string[]>(content, {
    header: false,
    skipEmptyLines: true,
  });
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
