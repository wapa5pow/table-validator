import { describe, expect, it, test } from "@jest/globals";
import { ColumnRule, PeggySyntaxError, parse } from "./grammar";

describe("Grammar Parser", () => {
  it("should parse notEmpty", () => {
    const expected: ColumnRule = [{ type: "notEmpty" }];
    expect(parse("notEmpty")).toEqual(expected);
  });

  it("should parse is", () => {
    const expected: ColumnRule = [{ type: "is", value: "a" }];
    expect(parse('is("a")')).toEqual(expected);
  });

  it("should parse unique", () => {
    const expected: ColumnRule = [{ type: "unique" }];
    expect(parse("unique")).toEqual(expected);
  });

  test.each([
    ["range(1,2)", [{ type: "range", min: 1, max: 2 }]],
    ["range(-2,-1)", [{ type: "range", min: -2, max: -1 }]],
    ["range(*,2)", [{ type: "range", min: "*", max: 2 }]],
    ["range(*,-2)", [{ type: "range", min: "*", max: -2 }]],
    ["range(1,*)", [{ type: "range", min: 1, max: "*" }]],
    ["range(-1,*)", [{ type: "range", min: -1, max: "*" }]],
  ])("should parse %s", (value, expected) => {
    expect(parse(value)).toEqual(expected);
  });

  test.each([
    ["length(10)", [{ type: "length", min: null, max: 10 }]],
    ["length(*,10)", [{ type: "length", min: "*", max: 10 }]],
    ["length(10,*)", [{ type: "length", min: 10, max: "*" }]],
  ])("should parse %s", (value, expected) => {
    expect(parse(value)).toEqual(expected);
  });

  test.each([
    ['regex("[bcm]at")', [{ type: "regex", value: "[bcm]at" }]],
    ['regex("[0-5]")', [{ type: "regex", value: "[0-5]" }]],
  ])("should parse %s", (value, expected) => {
    expect(parse(value)).toEqual(expected);
  });

  it("should throw syntax error for invalid input", () => {
    const input = "invalidRule";

    expect(() => parse(input)).toThrow(PeggySyntaxError);
  });
});
