import { Schema } from "../schema/schema";
import { Row, Table } from "../table/table";
import { ValidationError } from "./errors";

export class Validator {
	validate(table: Table, schema: Schema): ValidationError[] {
		return table.rows.flatMap((row) => this.validateRow(row, schema));
	}

	private validateRow(row: Row, schema: Schema): ValidationError[] {
		const errors: ValidationError[] = [];
		for (const columnIndex of row.cellValues.keys()) {
			const columnDefinition = schema.columnDefinitions[columnIndex];
			for (const rule of columnDefinition.rules) {
				const result = rule.evaluate(columnIndex, row);
				if (result.error !== undefined) {
					errors.push(result.error);
				}
			}
		}
		return errors;
	}
}
