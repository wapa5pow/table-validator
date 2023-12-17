import { describe, expect, it } from "@jest/globals";
import { YamlFieldError, YamlParseError } from "./errors";
import { convertToSchema } from "./setting";
describe("convertToSchema", () => {
  it("should parse the content", () => {
    const content = `
columns:
  - id: id
    rule: length(5)
      `;
    const schema = convertToSchema(content);
    expect(schema.columnRules).toHaveLength(1);
  });

  it("should throw error if the yaml is invalid", () => {
    const content = `
abc
---
def
    `;
    try {
      convertToSchema(content);
    } catch (error) {
      expect(error).toBeInstanceOf(YamlParseError);
      if (!(error instanceof YamlParseError)) {
        throw error;
      }
      expect(error.code).toBe("MULTIPLE_DOCS");
      expect(error.line).toBe(3);
      expect(error.column).toBe(1);
    }
  });

  it("should throw error if the yaml content is invalid", () => {
    const content = `
columns:
  - id: id
      `;
    try {
      convertToSchema(content);
    } catch (error) {
      expect(error).toBeInstanceOf(YamlFieldError);
      if (!(error instanceof YamlFieldError)) {
        throw error;
      }
      expect(error.code).toBe("MISSING_FIELD");
      expect(error.field).toBe("rule");
    }
  });
});
