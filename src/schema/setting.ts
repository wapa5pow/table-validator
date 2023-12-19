import Ajv from "ajv";
import * as yaml from "yaml";
import { YamlParseError } from "./errors";
import { Schema } from "./schema";

const settingSchema = {
  type: "object",
  properties: {
    columns: {
      type: "array",
      items: {
        anyOf: [
          {
            type: "object",
            properties: {
              id: { type: "string", nullable: true },
              rule: { type: "string", nullable: true },
            },
            additionalProperties: false,
            required: [""],
          },
          {
            type: "null",
          },
        ],
      },
    },
  },
  required: ["columns"],
  additionalProperties: false,
} as const;

interface Setting {
  readonly columns: {
    readonly id?: string;
    readonly rule?: string;
  }[];
}

/**
 * convert yaml to schema
 *
 * @param content yaml in string
 * @returns
 */
export function convertToSchema(content: string): Schema {
  try {
    const parsedYaml = yaml.parse(content, { prettyErrors: true });
    const ajv = new Ajv();
    const validator = ajv.compile<Setting>(settingSchema);
    if (validator(parsedYaml)) {
      const rawRules = parsedYaml.columns.map((column) => column?.rule ?? "");
      return new Schema(rawRules);
    }
    const error = validator.errors?.[0];
    throw (
      new YamlParseError(
        `${error?.message ?? "unknown error"}: path:${
          error?.instancePath
        }, params: ${JSON.stringify(Object.values(error?.params ?? [""])[0])}`,
      ) ?? new Error("unknown error")
    );
  } catch (error) {
    if (error instanceof yaml.YAMLParseError) {
      let line: number | undefined;
      let column: number | undefined;
      const linePos = error.linePos;
      if (linePos) {
        line = linePos[0].line;
        column = linePos[0].col;
      }
      throw new YamlParseError(
        `parse fails for line: ${line}, column: ${column}, reason: ${error.code}`,
      );
    }
    throw error;
  }
}
