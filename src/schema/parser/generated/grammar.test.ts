import { describe, expect, it } from "@jest/globals";
import { PeggySyntaxError, parse } from "./grammar";

describe("Grammar Parser", () => {
  it("should throw syntax error for invalid input", () => {
    const input = "invalidRule";

    expect(() => parse(input)).toThrow(PeggySyntaxError);
  });
});
