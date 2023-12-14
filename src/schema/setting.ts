import * as yaml from "yaml";
import * as grammar from "../schema/parser/generated/grammar";
import { Schema } from "./schema";

interface Setting {
  readonly columns: {
    readonly id: string;
    readonly rule: string;
  }[];
}

export function convertToContentRule(content: string): Schema {
  const setting = yaml.parse(content) as Setting;
  const columnRules: grammar.ColumnRule[] = setting.columns.map((column) =>
    grammar.parse(column.rule),
  );
  return new Schema(columnRules);
}
