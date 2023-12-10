import * as yaml from "yaml";
import { ColumnRule, parse } from "../parser/generated/grammar";
import { Schema } from "./schema";

interface Setting {
  readonly columns: {
    readonly id: string;
    readonly rule: string;
  }[];
}

export function convertToSchema(content: string): Schema {
  const setting = yaml.parse(content) as Setting;
  const rules: ColumnRule[] = setting.columns.map((column) =>
    parse(column.rule),
  );
  return new Schema(rules);
}
