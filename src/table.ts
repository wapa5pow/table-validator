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
