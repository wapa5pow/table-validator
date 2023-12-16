import * as yaml from "yaml";
import { Schema } from "./schema";

interface Setting {
  readonly columns: {
    readonly id: string;
    readonly rule: string;
  }[];
}

export function convertToContentRule(content: string): Schema {
  const setting = yaml.parse(content) as Setting;
  const rawRules = setting.columns.map((column) => column.rule);
  return new Schema(rawRules);
}
