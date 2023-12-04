import { ColumnDefinition, NotEmptyRule, Schema } from "./rule";
import { Row, Table } from "./table";
import { Validator } from "./validator";

async function main() {
	const table = new Table([new Row(1, [""])]);
	const schema = new Schema([new ColumnDefinition([new NotEmptyRule()])]);
	const validator = new Validator();
	const result = validator.validate(table, schema);
	if (result.error === undefined) {
		console.log("エラーなし");
	} else {
		for (const error of result.error) {
			console.log(error);
		}
	}
}

main();
