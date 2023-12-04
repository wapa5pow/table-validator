export class ValidationError extends Error {
	private _ruleName: string;
	private _lineNumber: number;
	private _columnIndex: number;

	constructor(ruleName: string, lineNumber: number, columnIndex: number) {
		const message = `fails for rule: ${ruleName}, line: ${lineNumber}, column: ${columnIndex}`;
		super(message);
		this._ruleName = ruleName;
		this._lineNumber = lineNumber;
		this._columnIndex = columnIndex;
		this.name = "ValidationError";
	}
}
