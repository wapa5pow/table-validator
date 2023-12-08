import "source-map-support/register";
import { Result } from "./result";
import { readSettingFile } from "./schema/setting";
import { readTable } from "./table/table";
import { Validator } from "./validator/validator";

if (require.main === module) {
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
		const schema = readSettingFile(schemaPath);

		// csv読み込み
		const table = readTable(process.argv[3]);
		const validator = new Validator();
		const result = validator.validate(table, schema);
		if (result.error === undefined) {
			console.log("エラーなし");
		} else {
			for (const error of result.error) {
				console.error(error.message);
			}
			process.exit(1);
		}
	}

	main();
}

export { Validator };
