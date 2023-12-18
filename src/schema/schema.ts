import { RuleParseError } from "./errors";
import {
  ColumnRule,
  PeggySyntaxError,
  parse,
} from "./parser/generated/grammar";

export class Schema {
  readonly columnRules: (ColumnRule | undefined)[];

  constructor(readonly rawRules: string[]) {
    this.columnRules = [];
    for (let i = 0; i < rawRules.length; i++) {
      try {
        const rawRule = rawRules[i];
        if (rawRule != null) {
          this.columnRules.push(parse(rawRule.trim()));
        } else {
          this.columnRules.push(undefined);
        }
      } catch (error) {
        if (error instanceof PeggySyntaxError) {
          throw new RuleParseError(i, error.location.start.offset);
        }
        throw error;
      }
    }
  }
}
