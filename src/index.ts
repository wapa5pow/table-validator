import * as fs from "fs";
import * as papa from "papaparse";
import "source-map-support/register";
import * as yaml from "yaml";
import { Result } from "./result";
import { ColumnDefinition, NotEmptyRule, Rule, Schema } from "./rule";
import { Row, Table } from "./table";
import { Validator } from "./validator";

function validateArgs(args: string[]): Result<void, string> {
	const usage = "Usage: csvv schema.yaml data.csv";
	if (args.length !== 4) {
		return Result.failure(usage);
	}
	if (!args[2].endsWith(".yaml")) {
		return Result.failure(usage);
	}
	if (!args[3].endsWith(".csv")) {
		return Result.failure(usage);
	}
	return Result.success(undefined);
}

interface FileSchema {
	readonly columns: {
		readonly id: string;
		readonly rules: readonly string[];
	}[];
}

function convertFileSchema(fileSchema: FileSchema): Schema {
	const columnDefinitions: ColumnDefinition[] = [];
	for (const column of fileSchema.columns) {
		const rules: Rule[] = [];
		for (const rule of column.rules) {
			switch (rule) {
				case "NotEmpty":
					rules.push(new NotEmptyRule());
					break;
				default:
					throw new Error(`Unknown rule: ${rule}`);
			}
		}
		columnDefinitions.push(new ColumnDefinition(rules));
	}
	return new Schema(columnDefinitions);
}

async function main() {
	{
		const result = validateArgs(process.argv);
		if (result.isError()) {
			console.error(result.error);
			process.exit(1);
		}
	}

	// yaml読み込み
	const schemaPath = process.argv[2];
	const fileSchema = yaml.parse(
		fs.readFileSync(schemaPath, "utf8"),
	) as FileSchema;
	console.log(fileSchema);

	// csv読み込み
	const dataPath = process.argv[3];
	const file = fs.readFileSync(dataPath, "utf8");
	const csv = papa.parse<string[]>(file, { header: false });
	const header = csv.data.shift();
	const data = csv.data;
	console.log(header);
	console.log(data);

	const table = new Table(data.map((row, index) => new Row(index + 1, row)));
	const schema = convertFileSchema(fileSchema);
	const validator = new Validator();
	const result = validator.validate(table, schema);
	if (result.error === undefined) {
		console.log("エラーなし");
	} else {
		for (const error of result.error) {
			console.log(error);
		}
		process.exit(1);
	}
}

main();
