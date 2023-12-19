import * as yaml from "yaml";
import * as csvv from "./errors";
import { Schema } from "./schema";

interface Setting {
  readonly columns: {
    readonly id: string;
    readonly rule: string | null;
  }[];
}

export function validateSetting(setting: Setting) {
  if (setting.columns === undefined) {
    throw new csvv.YamlFieldError(
      "MISSING_FIELD",
      "columns",
      "columns field is required",
    );
  }
  if (!Array.isArray(setting.columns)) {
    throw new csvv.YamlFieldError(
      "INVALID_FIELD_TYPE",
      "columns",
      "columns field should be array",
    );
  }
}

export function convertToSchema(content: string): Schema {
  let setting: Setting;
  try {
    const parsedYaml = yaml.parse(content, { prettyErrors: true });
    setting = parsedYaml as Setting;
  } catch (error) {
    if (error instanceof yaml.YAMLParseError) {
      let line: number | undefined;
      let column: number | undefined;
      const linePos = error.linePos;
      if (linePos) {
        line = linePos[0].line;
        column = linePos[0].col;
      }
      throw new csvv.YamlParseError(
        error.code,
        line,
        column,
        `parse fails for line: ${line}, column: ${column}`,
      );
    }
    throw error;
  }
  validateSetting(setting);
  const rawRules = setting.columns.map((column) => column?.rule ?? "");
  return new Schema(rawRules);
}
