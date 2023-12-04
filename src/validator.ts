import { ValidationError } from "./errors";
import { Result } from "./result";
import { Schema } from "./rule";
import { Row, Table } from "./table";

export class Validator {
	validate(table: Table, schema: Schema): Result<void, ValidationError[]> {
		const errors = table.rows.flatMap((row) => this.validateRow(row, schema));
		return errors.length === 0
			? Result.success(undefined)
			: Result.failure(errors);
	}

	private validateRow(row: Row, schema: Schema): ValidationError[] {
		const errors: ValidationError[] = [];
		for (const columnIndex of row.cellValues.keys()) {
			for (const columnDefinition of schema.columnDefinitions) {
				for (const rule of columnDefinition.rules) {
					const result = rule.evaluate(columnIndex, row);
					if (result.error !== undefined) {
						errors.push(result.error);
					}
				}
			}
		}
		return errors;
	}
}
