import { describe, expect, it } from "@jest/globals";
import { YamlParseError } from "./errors";
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

  it("should parse empty column rule", () => {
    const content = `
    columns:
      - id: id
        rule: length(5)
      -
      - id: name
          `;
    const schema = convertToSchema(content);
    expect(schema.columnRules).toHaveLength(3);
  });

  it("should throw error if the yaml is invalid", () => {
    const content = `
abc
---
def
    `;
    try {
      convertToSchema(content);
      throw new Error("should not reach here");
    } catch (error) {
      expect(error).toBeInstanceOf(YamlParseError);
      if (!(error instanceof YamlParseError)) {
        throw error;
      }
      expect(error.message).toContain("MULTIPLE_DOCS");
    }
  });

  it("should throw error if the yaml content is invalid", () => {
    const content = `
columns:
  - id: id
    ok: ok
      `;
    try {
      convertToSchema(content);
      throw new Error("should not reach here");
    } catch (error) {
      expect(error).toBeInstanceOf(YamlParseError);
      expect(error).toBeInstanceOf(YamlParseError);
      if (!(error instanceof YamlParseError)) {
        throw error;
      }
      expect(error.message).toContain("must NOT have additional properties");
    }
  });
});
