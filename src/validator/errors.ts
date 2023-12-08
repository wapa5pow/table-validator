export class ValidationError extends Error {
	private _ruleName: string;
	// 1-indexed line number
	private _lineNumber: number;
	// 1-indexed column number
	private _columnNumber: number;

	constructor(ruleName: string, lineNumber: number, columnIndex: number) {
		const message = `fails for rule: ${ruleName}, line: ${lineNumber}, column: ${columnIndex}`;
		super(message);
		this._ruleName = ruleName;
		this._lineNumber = lineNumber;
		this._columnNumber = columnIndex + 1;
		this.name = "ValidationError";
	}
}
