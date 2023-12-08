import * as fs from "fs";
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

export function readTable(path: string): Table {
	const file = fs.readFileSync(path, "utf8");
	const csv = papa.parse<string[]>(file, { header: false });
	// biome-ignore lint/correctness/noUnusedVariables: <explanation>
	const header = csv.data.shift();
	const data = csv.data;
	const table = new Table(data.map((row, index) => new Row(index + 1, row)));
	return table;
}
