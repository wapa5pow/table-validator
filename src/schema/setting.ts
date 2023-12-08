import * as fs from "fs";
import * as yaml from "yaml";
import { ColumnDefinition } from "./column-definition";
import { NotEmptyRule, Rule } from "./rule";
import { Schema } from "./schema";

interface Setting {
	readonly columns: {
		readonly id: string;
		readonly rules: readonly string[];
	}[];
}

export function readSettingFile(path: string): Schema {
	const setting = yaml.parse(fs.readFileSync(path, "utf8")) as Setting;
	return convertSettingToSchema(setting);
}

function convertSettingToSchema(setting: Setting): Schema {
	const columnDefinitions: ColumnDefinition[] = [];
	for (const column of setting.columns) {
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
