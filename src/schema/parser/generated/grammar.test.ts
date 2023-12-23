import { describe, expect, it, test } from "@jest/globals";
import { PeggySyntaxError, parse } from "./grammar";

describe("parse", () => {
  describe("multiple expressions", () => {
    test.each([
      [
        "notEmpty and unique",
        {
          type: "and",
          left: {
            type: "notEmpty",
            text: "notEmpty",
          },
          right: {
            type: "unique",
            text: "unique",
          },
        },
      ],
      [
        "notEmpty  unique",
        {
          type: "and",
          left: {
            type: "notEmpty",
            text: "notEmpty",
          },
          right: {
            type: "unique",
            text: "unique",
          },
        },
      ],
    ])("%s returns %s when %s", (text, expected) => {
      const result = parse(text);
      expect(result).toEqual([expected]);
    });
  });

  describe("single expression", () => {
    test.each([
      [
        'is( "a" )',
        {
          type: "is",
          value: "a",
        },
      ],
      [
        'not( "a" )',
        {
          type: "not",
          value: "a",
        },
      ],
      [
        "range( 1, 10 )",
        {
          type: "range",
          min: 1,
          max: 10,
        },
      ],
      [
        "length( 1, 10 )",
        {
          type: "length",
          min: 1,
          max: 10,
        },
      ],
      [
        'regex( "[cmp]at" )',
        {
          type: "regex",
          value: "[cmp]at",
        },
      ],
      [
        'regex( "\\d+" )',
        {
          type: "regex",
          value: "\\d+",
        },
      ],
      [
        'any( "a", "b" , "c" )',
        {
          type: "any",
          left: "a",
          right: ["b", "c"],
        },
      ],
    ])("%s returns %s when %s", (text, expected) => {
      const result = parse(text);
      expect(result).toEqual([
        {
          ...expected,
          text: text,
        },
      ]);
    });
  });

  it("should throw syntax error for invalid input", () => {
    const input = "invalidRule";
    expect(() => parse(input)).toThrow(PeggySyntaxError);
  });
});
