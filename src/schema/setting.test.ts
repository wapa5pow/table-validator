import { describe, expect, test } from "@jest/globals";
import { ColumnValidationExpr } from "../../dist/schema/parser/generated/grammar";
import { Unique } from "./parser/generated/grammar";
import { parseColumnRule } from "./setting";

describe("parseColumnRule", () => {
  test.each([
    ["", [] as ColumnValidationExpr[]], //
    ["unique", [{ type: "unique" }] as Unique[]], //
  ])("returns %s when %s", (value, expected) => {
    expect(parseColumnRule(value)).toStrictEqual(expected);
  });
});
