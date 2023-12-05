import { ValidationError } from "./errors";
import { Result } from "./result";
import { Row } from "./table";

export abstract class Rule {
	abstract name: string;

	// 行全体に対して評価する
	evaluate(columnIndex: number, row: Row): Result<void, ValidationError> {
		if (this.valid(row.cellValues[columnIndex], columnIndex, row)) {
			return Result.success(undefined);
		}
		return Result.failure(this.fail(columnIndex, row));
	}

	// 特定のセルの値に対して評価する
	abstract valid(cellValue: string, columnIndex: number, row: Row): boolean;

	// 失敗した場合のエラー定義
	fail(columnIndex: number, row: Row): ValidationError {
		return new ValidationError(this.name, row.lineNumber, columnIndex);
	}
}

export class NotEmptyRule extends Rule {
	name = "NotEmpty";

	valid(cellValue: string): boolean {
		return cellValue !== "";
	}
}

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
